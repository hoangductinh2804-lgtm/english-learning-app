export const categories = [
  {
    slug: "daily-life",
    icon: "🧺",
    title: "Daily Life",
    description: "Tu vung thong dung ve sinh hoat hang ngay",
    flashcardsTotal: 350,
    listeningTotal: 73,
  },
  {
    slug: "food-drink",
    icon: "🍔",
    title: "Food & Drink",
    description: "Ten cac mon an, do uong va tu vung lien quan",
    flashcardsTotal: 119,
    listeningTotal: 98,
  },
  {
    slug: "clothes-fashion",
    icon: "👕",
    title: "Clothes & Fashion",
    description: "Tu vung ve trang phuc va phong cach thoi trang",
    flashcardsTotal: 118,
    listeningTotal: 96,
  },
  {
    slug: "jobs-occupations",
    icon: "💼",
    title: "Jobs & Occupations",
    description: "Ten goi va mo ta cac nghe nghiep pho bien",
    flashcardsTotal: 98,
    listeningTotal: 94,
  },
];

export const quickPractice = [
  { label: "Bo the", icon: "🃏", path: "/flashcards" },
  { label: "Luyen Nghe", icon: "🎧", path: "/listening" },
  { label: "Luyen Doc", icon: "📖", path: "/flashcards" },
  { label: "Ngu Phap", icon: "📚", path: "/flashcards" },
  { label: "Ghep The", icon: "🧩", path: "/flashcards" },
  { label: "Cong cu", icon: "🧰", path: "/" },
  { label: "Ngu am", icon: "📣", path: "/listening" },
  { label: "Voice to Voice", icon: "🗣", path: "/study/daily-life" },
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