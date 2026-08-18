import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms))
  ]);
}

// Helper for multi-model generation cascade with strict timeout per model
async function generateContentWithFallback(client: GoogleGenAI, fullPrompt: string) {
  const models = ["gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-3.7-flash"];
  for (const model of models) {
    try {
      const response = await withTimeout(
        client.models.generateContent({
          model,
          contents: fullPrompt,
          config: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        }),
        3500
      );
      if (response.text) {
        return { text: response.text, model };
      }
    } catch (err: any) {
      console.warn(`Model ${model} attempt failed or timed out:`, err?.message || err);
    }
  }
  return null;
}

// Helper for structured JSON meal analysis
async function analyzeMealWithFallback(client: GoogleGenAI, prompt: string) {
  const models = ["gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-3.7-flash"];
  for (const model of models) {
    try {
      const response = await withTimeout(
        client.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: 0.2,
            maxOutputTokens: 500
          }
        }),
        3500
      );
      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn(`Meal analysis with ${model} failed:`, err);
    }
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // AI Health Coach Chat endpoint (Fast Response)
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [], history = [], userContext = {}, mode = 'turbo' } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: "A message string is required." });
        return;
      }

      const client = getGeminiClient();

      // Format rich context representation
      const mealsSummary = (userContext.todayMeals || userContext.todaySummary?.mealsLogged || [])
        .map((m: any) => typeof m === 'string' ? `- ${m}` : `- ${m.name || 'Item'} (${m.mealType || 'Meal'}): ${m.calories || 0} kcal, ${m.protein || 0}g protein, ${m.carbs || 0}g carbs, ${m.fats || 0}g fats`)
        .join('\n') || 'No meals logged yet today.';

      const exercisesSummary = (userContext.todayExercises || [])
        .map((e: any) => `- ${e.name || 'Exercise'} (${e.category || 'Workout'}): ${e.durationMinutes || 0} mins, ${e.caloriesBurned || 0} kcal burned`)
        .join('\n') || 'No workouts logged yet today.';

      const habitsSummary = (userContext.habits || [])
        .map((h: any) => `- [${h.completed ? 'COMPLETED' : 'PENDING'}] ${h.title} (${h.category || 'General'})`)
        .join('\n') || 'No habits configured.';

      const slotsSummary = (userContext.bookedSlots || [])
        .map((s: any) => `- ${s.doctorName || 'Doctor'} (${s.specialty || 'Consultation'}) on ${s.date} at ${s.timeSlot} [Status: ${s.status}]`)
        .join('\n') || 'No appointments currently booked.';

      const bmiHistorySummary = (userContext.bmiHistory || [])
        .slice(0, 5)
        .map((b: any) => `- ${b.date}: Weight ${b.weight} kg, BMI ${b.bmi} (${b.category || ''})`)
        .join('\n') || 'No past BMI history records.';

      const recentDaysSummary = (userContext.recentDays || [])
        .slice(0, 5)
        .map((d: any) => `- ${d.date}: ${d.calories || 0} kcal eaten, ${d.waterGlasses || 0} water glasses, ${d.exerciseBurned || 0} kcal burned`)
        .join('\n') || 'No past day records.';

      const contextPrompt = `
You are the "NutriTrack AI Health & Diet Coach", an intelligent, empathetic, science-backed nutrition and fitness assistant built for a community health initiative (CEP).
You have full access to this user's real-time NutriTrack dashboard, health metrics, and historical logs:

=== USER PROFILE & BODY METRICS ===
- Name: ${userContext.name || 'Community Member'}
- Email: ${userContext.email || 'N/A'}
- Role: ${userContext.role || 'user'}
- Age: ${userContext.age || 'N/A'} years old
- Gender: ${userContext.gender || 'N/A'}
- Height: ${userContext.height ? `${userContext.height} cm` : 'N/A'}
- Weight: ${userContext.weight ? `${userContext.weight} kg` : 'N/A'}
- Target Goal Weight: ${userContext.targetWeight ? `${userContext.targetWeight} kg` : 'N/A'}
- Primary Health Goal: ${userContext.goal || 'General Health & Fitness'}
- Activity Level: ${userContext.activityLevel || 'Moderate'}
- Dietary Preference: ${userContext.dietaryPreference || 'Standard / Vegetarian'}
- Calculated BMI: ${userContext.bmi ? `${userContext.bmi} (${userContext.bmiCategory || 'Normal'})` : 'N/A'}
- Daily Calorie Target: ${userContext.calorieBudget || userContext.targetCalories || 2000} kcal
- Daily Hydration Target: ${userContext.waterGoal || userContext.targetWaterGlasses || 8} glasses (~${(userContext.waterGoal || userContext.targetWaterGlasses || 8) * 250} ml)

=== TODAY'S LOGGED INTAKE & ACTIVITY (${userContext.todayDate || new Date().toISOString().split('T')[0]}) ===
- Total Calories Consumed: ${userContext.todayCalories || userContext.todaySummary?.totalCaloriesEaten || 0} kcal
- Calorie Budget Remaining: ${(userContext.calorieBudget || userContext.targetCalories || 2000) - (userContext.todayCalories || userContext.todaySummary?.totalCaloriesEaten || 0)} kcal
- Total Water Consumed: ${userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0} glasses (${(userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0) * 250} ml)
- Water Remaining to Goal: ${Math.max(0, (userContext.waterGoal || userContext.targetWaterGlasses || 8) - (userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0))} glasses
- Total Workout Calories Burned: ${userContext.todayExerciseCalories || userContext.todaySummary?.totalExerciseBurned || 0} kcal (${userContext.todayExerciseMins || 0} minutes)
- Total Macros Today: Protein: ${userContext.todayProtein || 0}g | Carbs: ${userContext.todayCarbs || 0}g | Fats: ${userContext.todayFats || 0}g | Fiber: ${userContext.todayFiber || 0}g

=== TODAY'S MEALS LOGGED ===
${mealsSummary}

=== TODAY'S WORKOUTS LOGGED ===
${exercisesSummary}

=== DAILY HEALTH HABITS ===
${habitsSummary}

=== BOOKED HEALTH CONSULTATIONS / SLOTS ===
${slotsSummary}

=== RECENT BMI & WEIGHT TRENDS ===
${bmiHistorySummary}

=== RECENT DAILY TRENDS ===
${recentDaysSummary}

=== INSTRUCTIONS FOR THE AI ASSISTANT ===
1. You have complete, real-time awareness of all data above. If the user asks ANY question about their nutrition, logged meals, calories left, water intake, workouts, BMI, habit checklist, doctor slots, or weight progress, reference the EXACT data points above with accurate calculations.
2. If the user asks for meal suggestions, workouts, diet plans, Indian or international recipes, macro recommendations, or health tips, provide structured, clear, and actionable advice tailored to their specific goal (${userContext.goal || 'General Health'}) and calorie/macro numbers.
3. Answer ANY health, fitness, food, nutrition science, or wellness question the user asks with deep knowledge, polite tone, clear bold headings, and bullet points.
4. Keep the response crisp, fast, and structured so the user gets actionable insights instantly.
`;

      if (!client) {
        // High-quality local rule engine matching user questions
        const lowerMsg = message.toLowerCase();
        let fallbackReply = `Hello ${userContext.name || 'there'}! I'm your NutriTrack AI Health Coach. 🌟\n\n`;

        if (lowerMsg.includes('water') || lowerMsg.includes('hydrat') || lowerMsg.includes('drink')) {
          const drunk = userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0;
          const goal = userContext.waterGoal || userContext.targetWaterGlasses || 8;
          const left = Math.max(0, goal - drunk);
          fallbackReply += `💧 **Your Hydration Status Today:**\n- **Logged:** ${drunk} glasses (${drunk * 250} ml)\n- **Daily Goal:** ${goal} glasses (${goal * 250} ml)\n- **Remaining:** ${left} glasses (${left * 250} ml)\n\n${left === 0 ? '🎉 Amazing job! You have hit your hydration goal for today.' : '💡 **Tip:** Keep a water bottle nearby and sip a glass before your next meal to stay energized!'}`;
        } else if (lowerMsg.includes('calorie') || lowerMsg.includes('meal') || lowerMsg.includes('eat') || lowerMsg.includes('food') || lowerMsg.includes('diet')) {
          const eaten = userContext.todayCalories || userContext.todaySummary?.totalCaloriesEaten || 0;
          const target = userContext.calorieBudget || userContext.targetCalories || 2000;
          const remaining = target - eaten;
          fallbackReply += `🥗 **Your Calorie & Nutrition Status:**\n- **Consumed Today:** ${eaten} kcal\n- **Target Budget:** ${target} kcal\n- **Remaining Budget:** ${remaining} kcal\n- **Logged Meals:**\n${mealsSummary}\n\n💡 **Coaching Tip:** Prioritize protein (paneer, lentils, eggs, sprouts) and complex carbs (oats, whole wheat, brown rice) to stay satiated.`;
        } else if (lowerMsg.includes('bmi') || lowerMsg.includes('weight') || lowerMsg.includes('height')) {
          fallbackReply += `⚖️ **Your BMI & Weight Metrics:**\n- **Current Weight:** ${userContext.weight || 70} kg\n- **Height:** ${userContext.height || 172} cm\n- **BMI:** ${userContext.bmi || 23.6} (${userContext.bmiCategory || 'Normal weight'})\n- **Goal Weight:** ${userContext.targetWeight || 'Maintenance'} kg\n\n💡 **Insight:** A healthy BMI range for Asian Indian populations is 18.5 - 22.9 kg/m². Your current profile is well-aligned with your active wellness targets.`;
        } else if (lowerMsg.includes('workout') || lowerMsg.includes('exercise') || lowerMsg.includes('gym') || lowerMsg.includes('burn')) {
          const burned = userContext.todayExerciseCalories || userContext.todaySummary?.totalExerciseBurned || 0;
          const mins = userContext.todayExerciseMins || 0;
          fallbackReply += `🏃 **Your Exercise & Activity Status:**\n- **Minutes Active Today:** ${mins} mins\n- **Calories Burned:** ${burned} kcal\n- **Workouts Logged:**\n${exercisesSummary}\n\n💡 **Recommendation:** Aim for 30 minutes of aerobic or strength training daily (such as brisk walking, Surya Namaskar, or bodyweight circuits).`;
        } else if (lowerMsg.includes('habit') || lowerMsg.includes('checklist')) {
          fallbackReply += `✅ **Your Daily Health Habits Checklist:**\n${habitsSummary}\n\nKeep ticking off your habits daily to build lasting consistency!`;
        } else if (lowerMsg.includes('slot') || lowerMsg.includes('appointment') || lowerMsg.includes('doctor') || lowerMsg.includes('camp')) {
          fallbackReply += `🩺 **Your Booked Health Camp Consultations:**\n${slotsSummary}\n\nYou can book more consultation slots anytime in the Health Camps section.`;
        } else {
          fallbackReply += `Based on your profile (${userContext.goal || 'General Health'} target with ${userContext.calorieBudget || 2000} kcal/day):\n1. **Nutrition:** You have consumed ${userContext.todayCalories || 0} kcal today out of ${userContext.calorieBudget || 2000} kcal.\n2. **Hydration:** You have logged ${userContext.todayWaterGlasses || 0} / ${userContext.waterGoal || 8} glasses of water.\n3. **Activity:** ${userContext.todayExerciseCalories || 0} kcal burned across ${userContext.todayExerciseMins || 0} active minutes.\n\n*(To activate live unlimited Gemini AI conversational intelligence, configure your Gemini API Key in Settings > Secrets).*`;
        }

        res.json({ reply: fallbackReply, model: 'local-expert-rules' });
        return;
      }

      const fullPrompt = `${contextPrompt}\n\nUser Question: ${message}`;

      let replyText = "";
      let usedModel = "local-fallback";
      
      const genResult = await generateContentWithFallback(client, fullPrompt);
      if (genResult && genResult.text) {
        replyText = genResult.text;
        usedModel = genResult.model;
      }

      if (!replyText) {
        // High-level fallback with data awareness
        const drunk = userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0;
        const goal = userContext.waterGoal || userContext.targetWaterGlasses || 8;
        const eaten = userContext.todayCalories || userContext.todaySummary?.totalCaloriesEaten || 0;
        const target = userContext.calorieBudget || userContext.targetCalories || 2000;
        const burned = userContext.todayExerciseCalories || userContext.todaySummary?.totalExerciseBurned || 0;

        replyText = `Hello ${userContext.name || 'friend'}! 🌟\n\nHere is your live health snapshot:\n- 🥗 **Calories Consumed:** ${eaten} / ${target} kcal (${Math.max(0, target - eaten)} kcal remaining)\n- 💧 **Hydration:** ${drunk} / ${goal} glasses (${drunk * 250} ml)\n- 🏃 **Active Exercise:** ${burned} kcal burned today\n- ⚖️ **BMI:** ${userContext.bmi || 23.6} (${userContext.bmiCategory || 'Normal'})\n\nHow can I help you customize your meals, workouts, or recipes today?`;
      }

      res.json({ reply: replyText, model: usedModel });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err);
      const drunk = req.body?.userContext?.todayWaterGlasses || 0;
      const eaten = req.body?.userContext?.todayCalories || 0;
      const target = req.body?.userContext?.calorieBudget || 2000;
      res.json({
        reply: `Hello! 🌟 Based on your logs today:\n- 🥗 **Calories:** ${eaten} / ${target} kcal\n- 💧 **Water:** ${drunk} glasses\n\nI am ready to help you plan nutritious meals, track hydration, or suggest workout routines!`,
        model: "offline-fallback"
      });
    }
  });

  // AI Health Coach Real-Time Streaming endpoint (SSE for instant token delivery)
  app.post("/api/gemini/stream", async (req, res) => {
    try {
      const { message, userContext = {} } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: "A message string is required." });
        return;
      }

      const client = getGeminiClient();

      // Set headers for Server-Sent Events (SSE)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      if (!client) {
        // Stream the instant local fallback smoothly
        const drunk = userContext.todayWaterGlasses || userContext.todaySummary?.totalWaterGlasses || 0;
        const goal = userContext.waterGoal || userContext.targetWaterGlasses || 8;
        const eaten = userContext.todayCalories || userContext.todaySummary?.totalCaloriesEaten || 0;
        const target = userContext.calorieBudget || userContext.targetCalories || 2000;

        const localText = `Hello ${userContext.name || 'friend'}! 🌟\n\nHere is your live health status:\n- 🥗 **Calories Consumed:** ${eaten} / ${target} kcal (${Math.max(0, target - eaten)} kcal left)\n- 💧 **Hydration:** ${drunk} / ${goal} glasses (${drunk * 250} ml)\n- ⚖️ **BMI:** ${userContext.bmi || 23.6} (${userContext.bmiCategory || 'Normal'})\n- 🏃 **Active Burn:** ${userContext.todayExerciseCalories || 0} kcal\n\nHow can I help you customize your meals or workouts further today?`;

        res.write(`data: ${JSON.stringify({ chunk: localText, done: false })}\n\n`);
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
        return;
      }

      const mealsSummary = (userContext.todayMeals || [])
        .map((m: any) => `- ${m.name || 'Item'} (${m.mealType || 'Meal'}): ${m.calories || 0} kcal, ${m.protein || 0}g protein`)
        .join('\n') || 'No meals logged yet today.';

      const exercisesSummary = (userContext.todayExercises || [])
        .map((e: any) => `- ${e.name || 'Exercise'}: ${e.durationMinutes || 0} mins, ${e.caloriesBurned || 0} kcal burned`)
        .join('\n') || 'No workouts logged yet today.';

      const contextPrompt = `
You are the NutriTrack AI Health & Fitness Coach. You have full access to the user's live dashboard:
- User Name: ${userContext.name || 'User'} (Goal: ${userContext.goal || 'General Health'})
- Today's Intake: ${userContext.todayCalories || 0} kcal / ${userContext.calorieBudget || 2000} kcal
- Hydration: ${userContext.todayWaterGlasses || 0} / ${userContext.waterGoal || 8} glasses
- Workouts Today: ${exercisesSummary}
- Meals Today: ${mealsSummary}
- BMI: ${userContext.bmi || 23.6} (${userContext.bmiCategory || 'Normal'})

Give a friendly, structured, fast, and actionable response with bold key terms and bullet points. Answer the user's question directly.
`;

      const fullPrompt = `${contextPrompt}\n\nUser Question: ${message}`;

      let streamedAny = false;
      const streamModels = ["gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-3.7-flash"];

      for (const model of streamModels) {
        try {
          const streamResult = await client.models.generateContentStream({
            model,
            contents: fullPrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens: 1000
            }
          });

          for await (const chunk of streamResult) {
            const textChunk = chunk.text;
            if (textChunk) {
              streamedAny = true;
              res.write(`data: ${JSON.stringify({ chunk: textChunk, done: false })}\n\n`);
            }
          }

          if (streamedAny) {
            break;
          }
        } catch (streamErr) {
          console.warn(`Stream with ${model} failed, trying next:`, streamErr);
        }
      }

      if (!streamedAny) {
        const eaten = userContext.todayCalories || 0;
        const target = userContext.calorieBudget || 2000;
        const drunk = userContext.todayWaterGlasses || 0;
        const goal = userContext.waterGoal || 8;
        const fallbackText = `Hello ${userContext.name || 'there'}! 🌟\n\n- 🥗 **Calories Logged:** ${eaten} / ${target} kcal\n- 💧 **Hydration Logged:** ${drunk} / ${goal} glasses\n- ⚖️ **BMI:** ${userContext.bmi || 23.6}\n\nFeel free to ask me for custom diet plans, healthy recipes, or fitness tips!`;
        res.write(`data: ${JSON.stringify({ chunk: fallbackText, done: false })}\n\n`);
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err: any) {
      console.error("Gemini Stream Error:", err);
      res.write(`data: ${JSON.stringify({ chunk: "Hello! I am your AI Health Coach. Stay hydrated and let me know what nutrition or fitness guidance you need!", done: false })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    }
  });

  // AI Meal Analysis endpoint (Fast Response)
  app.post("/api/gemini/analyze-meal", async (req, res) => {
    try {
      const { mealText } = req.body;
      if (!mealText) {
        res.status(400).json({ error: "Meal description is required." });
        return;
      }

      const client = getGeminiClient();
      if (!client) {
        // Rule-based fallback
        res.json({
          name: mealText,
          servingSize: "1 typical serving",
          calories: 250,
          protein: 8,
          carbs: 35,
          fats: 7,
          fiber: 4,
          category: "General",
          tips: "A balanced serving providing moderate energy."
        });
        return;
      }

      const prompt = `Analyze this food or meal description: "${mealText}".
Provide a realistic nutritional estimate for 1 standard serving.
Respond with ONLY valid JSON with this exact structure:
{
  "name": "Proper food name",
  "servingSize": "e.g. 1 bowl (200g) or 2 pcs",
  "calories": 250,
  "protein": 10,
  "carbs": 35,
  "fats": 7,
  "fiber": 4,
  "category": "Breakfast | Main Dish | Protein | Grains | Vegetables | Fruit | Salad | Snack | Beverage",
  "tips": "Brief 1-sentence health tip about this food"
}`;

      try {
        const rawText = await analyzeMealWithFallback(client, prompt);
        if (rawText) {
          const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          res.json(parsed);
          return;
        }
      } catch (aiErr) {
        console.warn("AI meal analysis fallback:", aiErr);
      }

      res.json({
        name: mealText,
        servingSize: "1 typical serving",
        calories: 280,
        protein: 9,
        carbs: 40,
        fats: 8,
        fiber: 4,
        category: "General",
        tips: "Nutritious option. Remember to balance with adequate protein and hydration."
      });
    } catch (err) {
      console.error("Meal analysis error:", err);
      res.status(500).json({ error: "Could not analyze meal" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriTrack full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
