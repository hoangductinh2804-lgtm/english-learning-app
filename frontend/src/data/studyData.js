export const categories = [
  {
    slug: "daily-life",
    icon: "🧺",
    cover: "/images/topics/daily-life.svg",
    title: "Daily Life",
    description: "Tu vung thong dung ve sinh hoat hang ngay",
    flashcardsTotal: 350,
    listeningTotal: 73,
  },
  {
    slug: "food-drink",
    icon: "🍔",
    cover: "/images/topics/food-drink.svg",
    title: "Food & Drink",
    description: "Ten cac mon an, do uong va tu vung lien quan",
    flashcardsTotal: 119,
    listeningTotal: 98,
  },
  {
    slug: "clothes-fashion",
    icon: "👕",
    cover: "/images/topics/clothes-fashion.svg",
    title: "Clothes & Fashion",
    description: "Tu vung ve trang phuc va phong cach thoi trang",
    flashcardsTotal: 118,
    listeningTotal: 96,
  },
  {
    slug: "jobs-occupations",
    icon: "💼",
    cover: "/images/topics/jobs-occupations.svg",
    title: "Jobs & Occupations",
    description: "Ten goi va mo ta cac nghe nghiep pho bien",
    flashcardsTotal: 98,
    listeningTotal: 94,
  },
];

export const quickPractice = [
  { label: "Bo the", icon: "🃏", path: "/flashcards" },
  { label: "Luyen Nghe", icon: "🎧", path: "/listening" },
  { label: "Luyen Doc", icon: "📖", path: "/reading" },
  { label: "Luyen Viet", icon: "✍", path: "/writing" },
  { label: "Ngu Phap", icon: "📚", path: "/grammar" },
  { label: "Ghep The", icon: "🧩", path: "/matching" },
  { label: "Cong cu", icon: "🧰", path: "/tools" },
  { label: "Ngu am", icon: "📣", path: "/pronunciation" },
  { label: "Voice to Voice", icon: "🗣", path: "/voice" },
];

export const studyDecks = {
  "daily-life": [
    "wake up",
    "brush teeth",
    "take a shower",
    "go to work",
    "cook dinner",
    "go to bed",
  ],
  "food-drink": ["hamburger", "noodles", "grilled fish", "orange juice", "salad"],
  "clothes-fashion": ["jacket", "sneakers", "dress", "belt", "scarf"],
  "jobs-occupations": ["designer", "teacher", "nurse", "accountant", "chef"],
};