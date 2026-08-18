import { ExerciseDatabaseItem, ExerciseCategory } from '../types';

export const WORLD_EXERCISE_DATABASE: ExerciseDatabaseItem[] = [
  // ==========================================
  // CARDIO & AEROBICS
  // ==========================================
  {
    id: 'ex-cardio-1',
    name: 'Brisk Walking (5-6 km/h)',
    category: 'cardio',
    met: 4.3,
    intensity: 'moderate',
    targetMuscles: ['Calves', 'Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: 'Walking Shoes',
    description: 'Energetic, fast-paced walking with active arm swing. Ideal for cardiovascular endurance, fat loss, and joint longevity.',
    caloriesPerMin70kg: 5.3,
    benefits: 'Low impact on knees, reduces blood pressure, improves insulin sensitivity.'
  },
  {
    id: 'ex-cardio-2',
    name: 'Outdoor Running / Jogging (8.5 km/h)',
    category: 'cardio',
    met: 8.3,
    intensity: 'high',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Core', 'Glutes'],
    equipment: 'Running Shoes',
    description: 'Sustained aerobic running maintaining a rhythmic breathing pattern. Highly effective for VO2 max and calorie expenditure.',
    caloriesPerMin70kg: 10.2,
    benefits: 'Strengthens cardiac muscles, enhances lung capacity, burns high calories.'
  },
  {
    id: 'ex-cardio-3',
    name: 'High-Speed Sprint Intervals',
    category: 'cardio',
    met: 12.5,
    intensity: 'vigorous',
    targetMuscles: ['Glutes', 'Hamstrings', 'Quadriceps', 'Calves', 'Abs'],
    equipment: 'Running Track / Turf',
    description: 'Maximal effort all-out sprint repetitions alternating with recovery walks.',
    caloriesPerMin70kg: 15.3,
    benefits: 'Boosts explosive power, triggers EPOC afterburn, stimulates human growth hormone.'
  },
  {
    id: 'ex-cardio-4',
    name: 'Cycling (Outdoor Moderate Pace 19-22 km/h)',
    category: 'cardio',
    met: 8.0,
    intensity: 'high',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    equipment: 'Bicycle, Helmet',
    description: 'Continuous road or trail bicycling at a steady, heart-elevating pace.',
    caloriesPerMin70kg: 9.8,
    benefits: 'Zero joint impact, builds lower-body endurance, great for commute fitness.'
  },
  {
    id: 'ex-cardio-5',
    name: 'Stationary Spin Bike (Intervals)',
    category: 'cardio',
    met: 8.5,
    intensity: 'high',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hip Flexors', 'Calves'],
    equipment: 'Stationary / Spin Bike',
    description: 'Indoor cycling alternating high-resistance hill climbs and rapid cadence sprints.',
    caloriesPerMin70kg: 10.4,
    benefits: 'Controlled indoor cardio, safe for all weather conditions, adjustable resistance.'
  },
  {
    id: 'ex-cardio-6',
    name: 'Swimming (Freestyle / Front Crawl)',
    category: 'cardio',
    met: 9.8,
    intensity: 'vigorous',
    targetMuscles: ['Lats', 'Shoulders', 'Chest', 'Core', 'Glutes', 'Legs'],
    equipment: 'Swimming Pool, Goggles',
    description: 'Continuous lap swimming utilizing alternating arm strokes and flutter kicks.',
    caloriesPerMin70kg: 12.0,
    benefits: 'Total-body resistance, zero impact on joints, strengthens entire respiratory system.'
  },
  {
    id: 'ex-cardio-7',
    name: 'Swimming (Breaststroke / Leisurely)',
    category: 'cardio',
    met: 5.3,
    intensity: 'moderate',
    targetMuscles: ['Inner Thighs', 'Pectorals', 'Upper Back', 'Core'],
    equipment: 'Swimming Pool',
    description: 'Synchronized arm sweep and frog-kick swimming suitable for recovery and endurance.',
    caloriesPerMin70kg: 6.5,
    benefits: 'Gentle whole-body workout, expands chest and shoulder mobility.'
  },
  {
    id: 'ex-cardio-8',
    name: 'Jump Rope (Speed & Rhythm)',
    category: 'cardio',
    met: 11.8,
    intensity: 'vigorous',
    targetMuscles: ['Calves', 'Forearms', 'Shoulders', 'Core', 'Quadriceps'],
    equipment: 'Jump Rope',
    description: 'Fast-paced rhythmic rope jumping on the balls of the feet with tight wrist rotations.',
    caloriesPerMin70kg: 14.5,
    benefits: 'Unmatched conditioning, improves footwork and agility, massive calorie burn.'
  },
  {
    id: 'ex-cardio-9',
    name: 'Rowing Machine (Ergometer)',
    category: 'cardio',
    met: 8.5,
    intensity: 'high',
    targetMuscles: ['Back (Lats/Rhomboids)', 'Legs (Quads/Hamstrings)', 'Arms', 'Core'],
    equipment: 'Rowing Ergometer',
    description: 'Full-body kinetic chain pulling exercise engaging 85% of the body muscle mass.',
    caloriesPerMin70kg: 10.4,
    benefits: 'Combines strength and cardiovascular conditioning in a single smooth movement.'
  },
  {
    id: 'ex-cardio-10',
    name: 'Stair Climbing / Stairmaster',
    category: 'cardio',
    met: 9.0,
    intensity: 'high',
    targetMuscles: ['Glutes', 'Quadriceps', 'Calves', 'Hamstrings'],
    equipment: 'Staircase / Revolving Stair Machine',
    description: 'Ascending stairs continuously with upright posture and full foot placement.',
    caloriesPerMin70kg: 11.0,
    benefits: 'Superb glute and quad shaping, burns twice as many calories as flat walking.'
  },
  {
    id: 'ex-cardio-11',
    name: 'Elliptical Cross Trainer',
    category: 'cardio',
    met: 6.5,
    intensity: 'moderate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Chest', 'Back'],
    equipment: 'Elliptical Machine',
    description: 'Dual-action pedal gliding with synchronized push-pull handlebar movement.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Smooth, non-jarring low impact cardio suitable for rehabilitation and active recovery.'
  },
  {
    id: 'ex-cardio-12',
    name: 'Zumba & Aerobics Dance',
    category: 'cardio',
    met: 6.8,
    intensity: 'moderate',
    targetMuscles: ['Whole Body', 'Hips', 'Core', 'Calves'],
    equipment: 'None / Music',
    description: 'High-energy, music-driven rhythmic dance movements and choreographed steps.',
    caloriesPerMin70kg: 8.3,
    benefits: 'Elevates mood and serotonin, improves coordination, high social enjoyment.'
  },

  // ==========================================
  // STRENGTH & GYM (RESISTANCE TRAINING)
  // ==========================================
  {
    id: 'ex-str-1',
    name: 'Barbell Back Squat',
    category: 'strength',
    met: 6.0,
    intensity: 'high',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Lower Back', 'Core'],
    equipment: 'Barbell, Squat Rack, Weight Plates',
    description: 'The king of lower-body lifts. Lowering hips until thighs are parallel with floor, then driving through heels.',
    caloriesPerMin70kg: 7.4,
    benefits: 'Stimulates systemic muscle growth, reinforces bone mineral density and hip strength.'
  },
  {
    id: 'ex-str-2',
    name: 'Deadlift (Conventional / Sumo)',
    category: 'strength',
    met: 6.5,
    intensity: 'vigorous',
    targetMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Lats', 'Forearms', 'Traps'],
    equipment: 'Barbell, Weight Plates',
    description: 'Lifting loaded barbell from floor to hip lockout using powerful posterior chain extension.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Builds functional pulling power, prevents lower back injury, strengthens posture.'
  },
  {
    id: 'ex-str-3',
    name: 'Barbell Flat Bench Press',
    category: 'strength',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'Bench, Barbell, Weight Plates',
    description: 'Pressing barbell upward from mid-chest level with elbows tucked at roughly 45 degrees.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Foundational upper-body pushing power, develops thick chest and front shoulders.'
  },
  {
    id: 'ex-str-4',
    name: 'Incline Dumbbell Chest Press',
    category: 'strength',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Clavicular Chest (Upper Pectorals)', 'Shoulders', 'Triceps'],
    equipment: 'Incline Bench, Pair of Dumbbells',
    description: 'Pressing dumbbells on 30-degree incline to target upper clavicular chest fibers.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Fixes left-right muscular imbalances, isolates upper chest development.'
  },
  {
    id: 'ex-str-5',
    name: 'Overhead Barbell Shoulder Press (OHP)',
    category: 'strength',
    met: 5.8,
    intensity: 'high',
    targetMuscles: ['Deltoids (Shoulders)', 'Upper Trapezius', 'Triceps', 'Core'],
    equipment: 'Barbell / Dumbbells',
    description: 'Pressing bar directly overhead while maintaining tight glutes and braced core.',
    caloriesPerMin70kg: 7.1,
    benefits: 'Builds boulder shoulders and resilient rotator cuffs with standing core stabilization.'
  },
  {
    id: 'ex-str-6',
    name: 'Bent-Over Barbell Row',
    category: 'strength',
    met: 5.8,
    intensity: 'moderate',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Rear Delts', 'Biceps', 'Lower Back'],
    equipment: 'Barbell, Weight Plates',
    description: 'Hinged forward at 45 degrees, pulling bar towards lower rib cage with scapular retraction.',
    caloriesPerMin70kg: 7.1,
    benefits: 'Essential for upper back thickness and counteracting forward slouching posture.'
  },
  {
    id: 'ex-str-7',
    name: 'Lat Pulldown (Wide & Close Grip)',
    category: 'strength',
    met: 5.0,
    intensity: 'moderate',
    targetMuscles: ['Latissimus Dorsi (Lats)', 'Biceps', 'Teres Major'],
    equipment: 'Cable Lat Machine',
    description: 'Smoothly drawing cable bar down to upper clavicle while arching chest upward.',
    caloriesPerMin70kg: 6.1,
    benefits: 'Creates V-taper physique, scalable resistance for building pull-up strength.'
  },
  {
    id: 'ex-str-8',
    name: 'Leg Press (Machine 45-degree)',
    category: 'strength',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: '45° Incline Leg Press',
    description: 'Controlled pressing of sled platform without locking out knees at the peak.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Heavy leg overload with minimal lower spinal loading.'
  },
  {
    id: 'ex-str-9',
    name: 'Romanian Deadlift (RDL with Dumbbells)',
    category: 'strength',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Erector Spinae'],
    equipment: 'Dumbbells / Barbell',
    description: 'Hip hinge movement with soft knees, pushing hips back until deep hamstring stretch.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Unbeatable hamstring hypertrophy and knee stability reinforcement.'
  },
  {
    id: 'ex-str-10',
    name: 'Bicep Barbell & Dumbbell Curls',
    category: 'strength',
    met: 4.5,
    intensity: 'moderate',
    targetMuscles: ['Biceps Brachii', 'Brachialis', 'Forearms'],
    equipment: 'Barbell / Dumbbells',
    description: 'Isolated elbow flexion without using body momentum or swinging lower back.',
    caloriesPerMin70kg: 5.5,
    benefits: 'Direct arm growth, increases grip and carrying power.'
  },
  {
    id: 'ex-str-11',
    name: 'Tricep Rope Pushdowns & Skullcrushers',
    category: 'strength',
    met: 4.5,
    intensity: 'moderate',
    targetMuscles: ['Triceps (Lateral, Medial, Long Head)'],
    equipment: 'Cable Machine / EZ-Curl Bar',
    description: 'Elbow extension targeting the tricep muscle that comprises 60% of upper arm size.',
    caloriesPerMin70kg: 5.5,
    benefits: 'Reinforces elbow joints and lock-out pushing strength.'
  },
  {
    id: 'ex-str-12',
    name: 'Kettlebell Swings (Russian & American)',
    category: 'strength',
    met: 8.5,
    intensity: 'high',
    targetMuscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Shoulders', 'Core'],
    equipment: 'Kettlebell',
    description: 'Explosive hip hinge thrusting kettlebell to chest height using glute power.',
    caloriesPerMin70kg: 10.4,
    benefits: 'Combines dynamic cardiovascular conditioning with bulletproof posterior chain power.'
  },

  // ==========================================
  // CALISTHENICS & BODYWEIGHT
  // ==========================================
  {
    id: 'ex-cal-1',
    name: 'Standard Push-Ups (Strict Form)',
    category: 'calisthenics',
    met: 5.0,
    intensity: 'moderate',
    targetMuscles: ['Chest', 'Anterior Deltoids', 'Triceps', 'Core'],
    equipment: 'None (Bodyweight)',
    description: 'Plank position lowering chest to floor and pushing up with locked core and glutes.',
    caloriesPerMin70kg: 6.1,
    benefits: 'Ultimate bodyweight push mastery, zero equipment needed anywhere.'
  },
  {
    id: 'ex-cal-2',
    name: 'Diamond / Close-Grip Push-Ups',
    category: 'calisthenics',
    met: 5.5,
    intensity: 'high',
    targetMuscles: ['Triceps', 'Inner Pectorals', 'Shoulders'],
    equipment: 'None (Bodyweight)',
    description: 'Hands together forming a triangle/diamond below chest for intense tricep loading.',
    caloriesPerMin70kg: 6.7,
    benefits: 'High arm isolation without weights.'
  },
  {
    id: 'ex-cal-3',
    name: 'Strict Pull-Ups / Chin-Ups',
    category: 'calisthenics',
    met: 7.0,
    intensity: 'vigorous',
    targetMuscles: ['Lats', 'Biceps', 'Rhomboids', 'Forearms', 'Core'],
    equipment: 'Pull-Up Bar',
    description: 'Dead hang pulling chin above bar without kipping or swinging legs.',
    caloriesPerMin70kg: 8.6,
    benefits: 'Gold standard measure of relative upper-body strength.'
  },
  {
    id: 'ex-cal-4',
    name: 'Parallel Bar Dips',
    category: 'calisthenics',
    met: 6.5,
    intensity: 'high',
    targetMuscles: ['Lower Chest', 'Triceps', 'Front Deltoids'],
    equipment: 'Dip Station / Parallel Bars',
    description: 'Lowering torso until elbows form 90 degrees, then pressing up forcefully.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Massive compound pressing power for upper torso.'
  },
  {
    id: 'ex-cal-5',
    name: 'Air Squats & Jump Squats',
    category: 'calisthenics',
    met: 6.0,
    intensity: 'moderate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    equipment: 'None (Bodyweight)',
    description: 'Deep bodyweight squats with optional explosive vertical jumps at top.',
    caloriesPerMin70kg: 7.4,
    benefits: 'Lower body stamina, knee cartilage lubrication, high metabolic rate.'
  },
  {
    id: 'ex-cal-6',
    name: 'Walking Lunges / Reverse Lunges',
    category: 'calisthenics',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Glutes', 'Quadriceps', 'Hamstrings', 'Adductors'],
    equipment: 'None',
    description: 'Step-by-step deep lunges dropping rear knee gently above ground.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Unilateral balance, fixes leg symmetry and hip mobility.'
  },
  {
    id: 'ex-cal-7',
    name: 'Isometric Forearm Plank Hold',
    category: 'calisthenics',
    met: 4.0,
    intensity: 'moderate',
    targetMuscles: ['Transverse Abdominis', 'Obliques', 'Shoulders', 'Lower Back'],
    equipment: 'Exercise Mat',
    description: 'Rigid horizontal bridge resting on forearms and toes with zero spinal sagging.',
    caloriesPerMin70kg: 4.9,
    benefits: 'Prevents lower back pain, builds rock-solid deep abdominal wall.'
  },
  {
    id: 'ex-cal-8',
    name: 'Hanging Leg Raises / Knee Tucks',
    category: 'calisthenics',
    met: 5.5,
    intensity: 'high',
    targetMuscles: ['Lower Rectus Abdominis', 'Hip Flexors', 'Grip'],
    equipment: 'Pull-Up Bar',
    description: 'Hanging from bar and raising straight legs to 90 degrees with posterior pelvic tilt.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Targets lower abdominal fibers and grip stamina.'
  },
  {
    id: 'ex-cal-9',
    name: 'Burpees with Push-Up & Jump',
    category: 'calisthenics',
    met: 10.0,
    intensity: 'vigorous',
    targetMuscles: ['Whole Body', 'Chest', 'Quads', 'Core', 'Shoulders'],
    equipment: 'None',
    description: 'Squat thrust into full push-up, snapping feet back in and leaping with arms overhead.',
    caloriesPerMin70kg: 12.3,
    benefits: 'Full-body cardiovascular inferno, maximal metabolic conditioning.'
  },
  {
    id: 'ex-cal-10',
    name: 'Mountain Climbers',
    category: 'calisthenics',
    met: 8.0,
    intensity: 'high',
    targetMuscles: ['Core', 'Shoulders', 'Hip Flexors', 'Quadriceps'],
    equipment: 'Mat',
    description: 'High plank running knee drives towards chest in rapid alternating succession.',
    caloriesPerMin70kg: 9.8,
    benefits: 'Dynamic core burning with cardiovascular endurance.'
  },

  // ==========================================
  // YOGA, ASANAS & FLEXIBILITY
  // ==========================================
  {
    id: 'ex-yoga-1',
    name: 'Surya Namaskar (Sun Salutation - 12 Cycles)',
    category: 'yoga',
    met: 6.5,
    intensity: 'moderate',
    targetMuscles: ['Full Body', 'Spine', 'Hamstrings', 'Chest', 'Core'],
    equipment: 'Yoga Mat',
    description: 'Ancient sequence of 12 linked postures synchronized with rhythmic inhalation and exhalation.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Complete mind-body integration, enhances flexibility, boosts blood circulation.'
  },
  {
    id: 'ex-yoga-2',
    name: 'Hatha Yoga Flow & Deep Asanas',
    category: 'yoga',
    met: 3.5,
    intensity: 'low',
    targetMuscles: ['Full Body Mobility', 'Hip Openers', 'Spine Extensors'],
    equipment: 'Yoga Mat',
    description: 'Slow-paced posture holds focusing on alignment, relaxation, and steady breathing.',
    caloriesPerMin70kg: 4.3,
    benefits: 'Reduces cortisol stress hormone, increases joint synovial fluid flow.'
  },
  {
    id: 'ex-yoga-3',
    name: 'Vinyasa Power Flow Yoga',
    category: 'yoga',
    met: 5.5,
    intensity: 'moderate',
    targetMuscles: ['Shoulders', 'Core', 'Legs', 'Glutes'],
    equipment: 'Yoga Mat',
    description: 'Fluid continuous transitions between warrior poses, chaturanga, and balance holds.',
    caloriesPerMin70kg: 6.7,
    benefits: 'Builds lean functional muscle tone and cardiovascular stamina.'
  },
  {
    id: 'ex-yoga-4',
    name: 'Pranayama (Kapalabhati, Anulom Vilom, Bhastrika)',
    category: 'yoga',
    met: 2.2,
    intensity: 'low',
    targetMuscles: ['Diaphragm', 'Intercostal Respiratory Muscles'],
    equipment: 'Quiet Space, Mat',
    description: 'Controlled yogic breathwork techniques purifying the nervous system and oxygenating cells.',
    caloriesPerMin70kg: 2.7,
    benefits: 'Calms anxiety, lowers resting pulse rate, clears mental fog.'
  },
  {
    id: 'ex-yoga-5',
    name: 'Warrior Poses Series (Virabhadrasana I, II, III)',
    category: 'yoga',
    met: 4.0,
    intensity: 'moderate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Ankles', 'Shoulders', 'Balance'],
    equipment: 'Yoga Mat',
    description: 'Grounding lunging poses expanding chest with focus and single-leg balancing.',
    caloriesPerMin70kg: 4.9,
    benefits: 'Strengthens ankles, knees, pelvic floor, and mental determination.'
  },
  {
    id: 'ex-yoga-6',
    name: 'Mat Pilates Core Sculpting',
    category: 'yoga',
    met: 4.5,
    intensity: 'moderate',
    targetMuscles: ['Deep Core (Transverse)', 'Glutes', 'Inner Thighs', 'Postural Chain'],
    equipment: 'Pilates Mat',
    description: 'Controlled low-impact movements focusing on core powerhouse stability and spine lengthening.',
    caloriesPerMin70kg: 5.5,
    benefits: 'Realigns posture, tightens waistline, cures muscular imbalances.'
  },

  // ==========================================
  // WORLDWIDE SPORTS & ATHLETICS
  // ==========================================
  {
    id: 'ex-sport-1',
    name: 'Cricket (Batting, Fast Bowling & Fielding)',
    category: 'sports',
    met: 6.5,
    intensity: 'moderate',
    targetMuscles: ['Shoulders', 'Legs (Running between wickets)', 'Core', 'Forearms'],
    equipment: 'Cricket Bat, Ball, Gear',
    description: 'Dynamic team sport featuring sprint intervals between wickets, bowling run-ups, and fielding agility.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Hand-eye coordination, rapid acceleration, teamwork and strategic sharpness.'
  },
  {
    id: 'ex-sport-2',
    name: 'Football / Soccer (Competitive Match)',
    category: 'sports',
    met: 10.0,
    intensity: 'vigorous',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Cardiovascular System', 'Core'],
    equipment: 'Football, Cleats',
    description: 'Continuous 90-minute pitch running, directional change sprints, ball kicking and jumping.',
    caloriesPerMin70kg: 12.3,
    benefits: 'Phenomenal aerobic and anaerobic capacity, lower-body athletic agility.'
  },
  {
    id: 'ex-sport-3',
    name: 'Badminton (Singles / Doubles Match)',
    category: 'sports',
    met: 7.5,
    intensity: 'high',
    targetMuscles: ['Calves', 'Shoulder / Rotator Cuff', 'Forearms', 'Glutes'],
    equipment: 'Racket, Shuttlecock, Court',
    description: 'Fast-paced court movement, explosive smashes, drop shots, and rapid directional lunges.',
    caloriesPerMin70kg: 9.2,
    benefits: 'Reflex reaction time, burns massive calories in short timeframes.'
  },
  {
    id: 'ex-sport-4',
    name: 'Tennis (Singles Tournament Match)',
    category: 'sports',
    met: 8.0,
    intensity: 'high',
    targetMuscles: ['Forehand/Backhand Arms', 'Shoulders', 'Legs', 'Core Obliques'],
    equipment: 'Tennis Racket, Tennis Balls, Court',
    description: 'High-intensity court sprints, powerful groundstrokes, serves, and stamina rallies.',
    caloriesPerMin70kg: 9.8,
    benefits: 'Total-body cardiovascular conditioning and explosive rotational power.'
  },
  {
    id: 'ex-sport-5',
    name: 'Basketball (Full-Court Game)',
    category: 'sports',
    met: 8.5,
    intensity: 'high',
    targetMuscles: ['Legs', 'Calves (Vertical Jump)', 'Deltoids', 'Cardio'],
    equipment: 'Basketball, Hoop',
    description: 'Fast break sprints, vertical rebounding, defensive sliding, and shooting accuracy.',
    caloriesPerMin70kg: 10.4,
    benefits: 'Vertical jump power, anaerobic conditioning, spatial awareness.'
  },
  {
    id: 'ex-sport-6',
    name: 'Kabaddi (Raiding & Defensive Tackling)',
    category: 'sports',
    met: 9.0,
    intensity: 'vigorous',
    targetMuscles: ['Legs', 'Back', 'Shoulders', 'Grip', 'Core', 'Lungs'],
    equipment: 'Court / Mat',
    description: 'Traditional contact sport requiring sustained breath retention (cant), rapid dodging, and powerful grappling.',
    caloriesPerMin70kg: 11.0,
    benefits: 'Lung capacity endurance, raw grappling strength, high agility under pressure.'
  },
  {
    id: 'ex-sport-7',
    name: 'Volleyball (Beach or Indoor Court)',
    category: 'sports',
    met: 6.0,
    intensity: 'moderate',
    targetMuscles: ['Shoulders', 'Quadriceps', 'Calves', 'Core'],
    equipment: 'Volleyball, Net',
    description: 'Spiking, blocking, diving digs, and setting with continuous lateral footwork.',
    caloriesPerMin70kg: 7.4,
    benefits: 'Upper-body plyometrics, team communication, lower limb reactive spring.'
  },
  {
    id: 'ex-sport-8',
    name: 'Table Tennis / Ping Pong',
    category: 'sports',
    met: 4.2,
    intensity: 'moderate',
    targetMuscles: ['Forearms', 'Wrists', 'Calves', 'Quads'],
    equipment: 'Paddles, Ball, Table',
    description: 'Fast-paced wrist spins, quick side shuffles, and high-frequency reflex exchanges.',
    caloriesPerMin70kg: 5.2,
    benefits: 'Sharpens brain neuroplasticity, hand-eye coordination, low joint strain.'
  },
  {
    id: 'ex-sport-9',
    name: 'Boxing (Heavy Bag & Sparring)',
    category: 'sports',
    met: 9.5,
    intensity: 'vigorous',
    targetMuscles: ['Shoulders', 'Chest', 'Core', 'Hips', 'Calves'],
    equipment: 'Boxing Gloves, Heavy Bag',
    description: 'Rhythmic combinations of jabs, crosses, hooks, slips, and continuous footwork.',
    caloriesPerMin70kg: 11.7,
    benefits: 'Stress release, rotational power transfer, intense cardiovascular stamina.'
  },
  {
    id: 'ex-sport-10',
    name: 'Martial Arts & MMA (Karate / Taekwondo / Judo)',
    category: 'sports',
    met: 10.0,
    intensity: 'vigorous',
    targetMuscles: ['Whole Body', 'Hip Flexors', 'Core', 'Shoulders'],
    equipment: 'Gi / Gloves / Mats',
    description: 'Striking, kicking techniques, throws, and ground grappling defense drills.',
    caloriesPerMin70kg: 12.3,
    benefits: 'Self-defense capability, flexibility, mental discipline, and resilience.'
  },

  // ==========================================
  // TRADITIONAL, FUNCTIONAL & DAILY LIFE
  // ==========================================
  {
    id: 'ex-trad-1',
    name: 'Desi Akhada Dand-Baithak (Hindu Pushups & Deep Squats)',
    category: 'traditional',
    met: 8.0,
    intensity: 'high',
    targetMuscles: ['Chest', 'Shoulders', 'Spine Mobility', 'Quadriceps', 'Core'],
    equipment: 'Ground / Soil',
    description: 'Traditional Indian wrestling calisthenics: diving swooping pushups (Dand) and heel-elevated deep squats (Baithak).',
    caloriesPerMin70kg: 9.8,
    benefits: 'Incredible spinal flexibility, bulletproof joints, raw natural tendon strength.'
  },
  {
    id: 'ex-trad-2',
    name: 'Garba & Dandiya Raas Folk Dance',
    category: 'traditional',
    met: 7.2,
    intensity: 'high',
    targetMuscles: ['Calves', 'Quadriceps', 'Core', 'Shoulders', 'Cardio'],
    equipment: 'Dandiya Sticks / Music',
    description: 'High-energy circular folk dance with rhythmic clapping, twirling, and jumping to dhol beats.',
    caloriesPerMin70kg: 8.8,
    benefits: 'Burns thousands of calories during festivities, massive endorphin boost.'
  },
  {
    id: 'ex-trad-3',
    name: 'Bhangra High-Intensity Dance Workout',
    category: 'traditional',
    met: 8.5,
    intensity: 'high',
    targetMuscles: ['Whole Body', 'Legs', 'Shoulders', 'Heart'],
    equipment: 'High-Tempo Music',
    description: 'Explosive Punjabi folk dance steps with shoulder bounces, high kicks, and joyous jumps.',
    caloriesPerMin70kg: 10.4,
    benefits: 'Intense fat burning workout that feels like an energetic cultural celebration.'
  },
  {
    id: 'ex-trad-4',
    name: 'Mallakhamb (Pole Gymnastics & Balance)',
    category: 'traditional',
    met: 7.5,
    intensity: 'vigorous',
    targetMuscles: ['Grip', 'Lats', 'Core', 'Inner Thighs', 'Shoulders'],
    equipment: 'Wooden Mallakhamb Pole / Rope',
    description: 'Ancient Indian gymnastic discipline holding aerial postures and acrobatic grips on a wooden pole.',
    caloriesPerMin70kg: 9.2,
    benefits: 'Exceptional grip strength, 360-degree core mastery, neuromuscular control.'
  },
  {
    id: 'ex-trad-5',
    name: 'Mudgar / Gada Swinging (Indian Club)',
    category: 'traditional',
    met: 6.5,
    intensity: 'moderate',
    targetMuscles: ['Shoulders (Rotator Cuff)', 'Forearms', 'Upper Back', 'Core'],
    equipment: 'Wooden Gada / Mudgar',
    description: 'Fluid 360-degree pendulum swings around the head and shoulders with heavy weighted club.',
    caloriesPerMin70kg: 8.0,
    benefits: 'Prevents shoulder impingement, reinforces wrist and forearm grip density.'
  },
  {
    id: 'ex-trad-6',
    name: 'HIIT Tabata Intervals (20s Work / 10s Rest)',
    category: 'hiit',
    met: 11.5,
    intensity: 'vigorous',
    targetMuscles: ['Total Body', 'Heart', 'Lungs', 'Fast-Twitch Fibers'],
    equipment: 'Timer / Mat',
    description: '8 rounds of 20 seconds maximum output followed by 10 seconds rest.',
    caloriesPerMin70kg: 14.1,
    benefits: 'Triggers long-lasting EPOC caloric burn up to 24 hours post-workout.'
  },
  {
    id: 'ex-trad-7',
    name: 'Farmer’s Walk (Heavy Load Carry)',
    category: 'hiit',
    met: 7.5,
    intensity: 'high',
    targetMuscles: ['Traps', 'Forearms/Grip', 'Core/Obliques', 'Glutes'],
    equipment: 'Heavy Dumbbells / Kettlebells',
    description: 'Walking erect with heavy weights in each hand for time or distance without leaning.',
    caloriesPerMin70kg: 9.2,
    benefits: 'Real-world functional strength, creates unbreakable core and grip power.'
  },
  {
    id: 'ex-trad-8',
    name: 'Daily Housework (Mopping, Scrubbing & Deep Cleaning)',
    category: 'daily_life',
    met: 3.8,
    intensity: 'moderate',
    targetMuscles: ['Arms', 'Shoulders', 'Lower Back', 'Legs'],
    equipment: 'Mop, Bucket, Cleaning Cloth',
    description: 'Vigorous floor scrubbing, surface cleaning, and moving items around home.',
    caloriesPerMin70kg: 4.7,
    benefits: 'NEAT (Non-Exercise Activity Thermogenesis) boosting daily calorie expenditure.'
  },
  {
    id: 'ex-trad-9',
    name: 'Gardening & Yard Work (Digging & Planting)',
    category: 'daily_life',
    met: 4.5,
    intensity: 'moderate',
    targetMuscles: ['Forearms', 'Lower Back', 'Quadriceps', 'Core'],
    equipment: 'Spade, Trowel, Watering Can',
    description: 'Digging soil, pulling weeds, lifting pots, and pruning plants outdoors in sunlight.',
    caloriesPerMin70kg: 5.5,
    benefits: 'Natural Vitamin D exposure, relaxing mindfulness, sustained gentle movement.'
  },
  {
    id: 'ex-trad-10',
    name: 'Carrying Heavy Groceries up Stairs',
    category: 'daily_life',
    met: 7.0,
    intensity: 'high',
    targetMuscles: ['Biceps', 'Traps', 'Glutes', 'Calves', 'Quadriceps'],
    equipment: 'Grocery Bags',
    description: 'Climbing multiple flights of building stairs carrying heavy shopping bags.',
    caloriesPerMin70kg: 8.6,
    benefits: 'Everyday functional conditioning that replaces elevator rides with health gains.'
  }
];

export const EXERCISE_CATEGORIES: Array<{ id: ExerciseCategory; name: string; iconName: string; color: string; bg: string }> = [
  { id: 'cardio', name: 'Cardio & Running', iconName: 'Flame', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { id: 'strength', name: 'Strength & Gym', iconName: 'Dumbbell', color: 'text-rose-500 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40' },
  { id: 'calisthenics', name: 'Calisthenics & Bodyweight', iconName: 'Activity', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  { id: 'yoga', name: 'Yoga & Flexibility', iconName: 'Sparkles', color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40' },
  { id: 'sports', name: 'Worldwide Sports', iconName: 'Trophy', color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/40' },
  { id: 'traditional', name: 'Traditional & Desi Workouts', iconName: 'Shield', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40' },
  { id: 'hiit', name: 'HIIT & Conditioning', iconName: 'Zap', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/40' },
  { id: 'daily_life', name: 'Daily Life & Functional', iconName: 'Heart', color: 'text-teal-500 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40' }
];

export function calculateCaloriesBurned(met: number, weightKg: number = 70, durationMinutes: number): number {
  // Calorie formula: (MET * 3.5 * weightInKg / 200) * durationMinutes
  const safeWeight = weightKg > 20 ? weightKg : 70;
  const cals = (met * 3.5 * safeWeight / 200) * durationMinutes;
  return Math.round(cals);
}
