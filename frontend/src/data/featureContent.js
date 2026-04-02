export const listeningLessons = [
  {
    id: "daily-life-listening",
    title: "Morning Routine",
    topic: "Daily Life",
    script: [
      "A: What time do you wake up on weekdays?",
      "B: I usually wake up at six and make a cup of tea.",
      "A: Do you exercise before work?",
      "B: Yes, I do a short workout for fifteen minutes.",
    ],
    questions: [
      {
        prompt: "What time does B wake up?",
        options: ["At 5:00", "At 6:00", "At 7:30"],
        answer: 1,
      },
      {
        prompt: "How long is B's workout?",
        options: ["10 minutes", "15 minutes", "30 minutes"],
        answer: 1,
      },
    ],
  },
  {
    id: "food-drink-listening",
    title: "At The Cafe",
    topic: "Food & Drink",
    script: [
      "A: Can I get a chicken sandwich and an iced coffee?",
      "B: Sure. Would you like sugar in your coffee?",
      "A: No sugar, please. Also add one apple pie.",
      "B: Great, your total is seven dollars.",
    ],
    questions: [
      {
        prompt: "What drink does A order?",
        options: ["Hot tea", "Iced coffee", "Orange juice"],
        answer: 1,
      },
      {
        prompt: "How much is the total?",
        options: ["$6", "$7", "$8"],
        answer: 1,
      },
    ],
  },
];

export const readingArticles = [
  {
    id: "reading-1",
    title: "How To Build A Strong Study Habit",
    level: "Beginner",
    content:
      "A strong study habit starts with a clear schedule. Choose one fixed time each day to learn English. Keep your study sessions short but focused. Review old words before learning new ones. At the end of each week, check your progress and adjust your plan.",
    questions: [
      {
        prompt: "What should you choose first?",
        options: ["A long textbook", "A fixed study time", "A difficult exam"],
        answer: 1,
      },
      {
        prompt: "How should study sessions be?",
        options: ["Short and focused", "Long and random", "Only on weekends"],
        answer: 0,
      },
    ],
  },
  {
    id: "reading-2",
    title: "A Productive Day At Work",
    level: "Intermediate",
    content:
      "Lina begins her workday by writing three priority tasks. She checks email only two times a day, so she can focus deeply. During lunch, she reviews vocabulary using flashcards. Before leaving the office, she spends ten minutes planning tomorrow.",
    questions: [
      {
        prompt: "How many priority tasks does Lina write?",
        options: ["Two", "Three", "Five"],
        answer: 1,
      },
      {
        prompt: "When does she review vocabulary?",
        options: ["At lunch", "At midnight", "In traffic"],
        answer: 0,
      },
    ],
  },
];

export const grammarLessons = [
  {
    id: "present-simple",
    title: "Present Simple",
    rules: [
      "Use Present Simple for habits and routines.",
      "Add -s/-es with he, she, it.",
      "Use do/does for questions and negatives.",
    ],
    examples: [
      "I study English every morning.",
      "She watches videos at night.",
      "Does he work on Saturdays?",
    ],
    exercise: {
      prompt: "Choose the correct sentence:",
      options: [
        "She go to school by bus.",
        "She goes to school by bus.",
        "She going to school by bus.",
      ],
      answer: 1,
    },
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    rules: [
      "Use am/is/are + verb-ing for actions happening now.",
      "Use now, right now, at the moment as time markers.",
    ],
    examples: [
      "They are preparing for the test.",
      "I am reading an article now.",
      "Is she speaking with the teacher?",
    ],
    exercise: {
      prompt: "Choose the correct sentence:",
      options: [
        "I am write an email.",
        "I writing an email.",
        "I am writing an email.",
      ],
      answer: 2,
    },
  },
];

export const matchingPairs = [
  { left: "wake up", right: "thuc day" },
  { left: "recipe", right: "cong thuc nau an" },
  { left: "uniform", right: "dong phuc" },
  { left: "deadline", right: "han chot" },
  { left: "schedule", right: "lich trinh" },
  { left: "salary", right: "muc luong" },
];

export const pronunciationPairs = [
  {
    pair: "ship / sheep",
    tip: "Short /i/ in ship, long /i:/ in sheep.",
    sample: "The ship is near the sheep farm.",
  },
  {
    pair: "cat / cut",
    tip: "Open /ae/ in cat, relaxed /ʌ/ in cut.",
    sample: "The cat cut the paper.",
  },
  {
    pair: "rice / rise",
    tip: " /s/ is unvoiced, /z/ is voiced.",
    sample: "Steam rises while the rice cooks.",
  },
];

export const voiceScenarios = [
  {
    title: "Ordering Food",
    prompt: "You are in a restaurant. Ask for a vegetarian dish and a drink.",
    usefulPhrases: [
      "Could I have...",
      "Do you have any vegetarian options?",
      "I would like to order...",
    ],
  },
  {
    title: "Job Interview Intro",
    prompt: "Introduce yourself and describe your strengths in English.",
    usefulPhrases: [
      "I have experience in...",
      "My strongest skill is...",
      "I am excited to contribute to...",
    ],
  },
];

export const toolsContent = {
  writingChecklist: [
    "Use one main idea per paragraph.",
    "Check verb tense consistency.",
    "Replace repeated words with synonyms.",
    "Read your paragraph aloud once before submitting.",
  ],
  speakingRoutine: [
    "2 minutes: shadow a short dialogue.",
    "3 minutes: describe your day.",
    "3 minutes: answer one random question.",
    "2 minutes: self-correct pronunciation.",
  ],
};
