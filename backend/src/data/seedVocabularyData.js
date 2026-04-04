import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { dictionary as cmuDictionary } from "cmu-pronouncing-dictionary";

const require = createRequire(import.meta.url);
const tratuPackagePath = path.dirname(require.resolve("tratu/package.json"));
const dictionaryPath = path.join(tratuPackagePath, "data", "av.txt");

const MAX_PER_TOPIC = 250;
const TARGET_TOTAL = 8500;

const topicDefinitions = [
  { slug: "daily-life", topic: "Daily Life", level: "beginner", keywords: ["routine", "morning", "evening", "home", "household", "sleep", "wake", "shower", "clean", "laundry", "meal", "weekday", "weekend", "daily"] },
  { slug: "food-drink", topic: "Food & Drink", level: "beginner", keywords: ["food", "drink", "meal", "restaurant", "cafe", "cook", "recipe", "kitchen", "fruit", "vegetable", "coffee", "tea", "juice", "bread", "soup", "dessert"] },
  { slug: "clothes-fashion", topic: "Clothes & Fashion", level: "beginner", keywords: ["cloth", "clothes", "fashion", "style", "dress", "shirt", "pants", "skirt", "jacket", "shoe", "sneaker", "belt", "scarf", "hat", "wear", "fabric"] },
  { slug: "jobs-occupations", topic: "Jobs & Occupations", level: "intermediate", keywords: ["job", "work", "office", "manager", "teacher", "doctor", "nurse", "engineer", "accountant", "chef", "boss", "salary", "client", "employee", "interview", "career"] },
  { slug: "travel", topic: "Travel", level: "beginner", keywords: ["travel", "trip", "journey", "airport", "flight", "hotel", "passport", "tourist", "luggage", "ticket", "map", "reservation", "destination", "train", "bus", "taxi"] },
  { slug: "shopping", topic: "Shopping", level: "beginner", keywords: ["shop", "shopping", "market", "store", "price", "discount", "sale", "bargain", "customer", "product", "vendor", "cashier", "receipt", "purchase", "order"] },
  { slug: "health", topic: "Health", level: "intermediate", keywords: ["health", "medicine", "clinic", "hospital", "doctor", "patient", "fever", "throat", "symptom", "disease", "treatment", "diet", "exercise", "pharmacy", "nurse", "sick"] },
  { slug: "education", topic: "Education", level: "beginner", keywords: ["school", "education", "class", "lesson", "student", "teacher", "study", "exam", "quiz", "assignment", "homework", "library", "subject", "textbook", "university"] },
  { slug: "family", topic: "Family", level: "beginner", keywords: ["family", "mother", "father", "mom", "dad", "grandma", "grandpa", "sister", "brother", "uncle", "aunt", "cousin", "relative", "parents", "children", "home"] },
  { slug: "technology", topic: "Technology", level: "intermediate", keywords: ["computer", "internet", "software", "hardware", "phone", "app", "screen", "website", "device", "download", "upload", "network", "password", "camera", "digital", "online"] },
  { slug: "environment", topic: "Environment", level: "intermediate", keywords: ["environment", "pollution", "recycle", "forest", "river", "water", "air", "energy", "climate", "nature", "eco", "sustainable", "tree", "planet", "green"] },
  { slug: "business", topic: "Business", level: "intermediate", keywords: ["business", "company", "client", "market", "sales", "profit", "contract", "budget", "project", "strategy", "meeting", "report", "team", "office", "investment", "finance"] },
  { slug: "science", topic: "Science", level: "advanced", keywords: ["science", "biology", "chemistry", "physics", "experiment", "laboratory", "hypothesis", "research", "theory", "measure", "discover", "planet", "astronomy", "data", "analysis"] },
  { slug: "emotions", topic: "Emotions", level: "beginner", keywords: ["happy", "sad", "angry", "excited", "worried", "relaxed", "proud", "tired", "nervous", "calm", "confident", "lonely", "hopeful", "surprised", "fear", "stress"] },
  { slug: "nature", topic: "Nature", level: "beginner", keywords: ["tree", "river", "forest", "air", "flower", "mountain", "lake", "sunlight", "bird", "grass", "cloud", "rain", "beach", "landscape", "nature", "wild"] },
  { slug: "sports-fitness", topic: "Sports & Fitness", level: "beginner", keywords: ["sport", "fitness", "exercise", "gym", "run", "running", "football", "basketball", "yoga", "training", "coach", "swim", "swimming", "match", "player", "workout"] },
  { slug: "music-arts", topic: "Music & Arts", level: "beginner", keywords: ["music", "art", "song", "dance", "paint", "painting", "drawing", "instrument", "guitar", "piano", "band", "performance", "theater", "gallery", "creative"] },
  { slug: "animals-pets", topic: "Animals & Pets", level: "beginner", keywords: ["animal", "pet", "dog", "cat", "bird", "fish", "horse", "cow", "tiger", "lion", "rabbit", "hamster", "puppy", "kitten", "zoo", "wildlife"] },
  { slug: "colors-shapes", topic: "Colors & Shapes", level: "beginner", keywords: ["color", "colour", "shape", "red", "blue", "green", "yellow", "circle", "square", "triangle", "rectangle", "round", "oval", "pattern", "line"] },
  { slug: "numbers-counting", topic: "Numbers & Counting", level: "beginner", keywords: ["number", "count", "one", "two", "three", "first", "second", "third", "hundred", "thousand", "million", "digit", "quantity", "total", "sum"] },
  { slug: "time-dates", topic: "Time & Dates", level: "beginner", keywords: ["time", "date", "day", "week", "month", "year", "clock", "calendar", "today", "tomorrow", "yesterday", "morning", "afternoon", "evening", "hour", "minute"] },
  { slug: "weather-climate", topic: "Weather & Climate", level: "beginner", keywords: ["weather", "climate", "sunny", "rainy", "cloudy", "windy", "storm", "temperature", "cold", "hot", "snow", "season", "humidity", "forecast", "fog", "breeze"] },
  { slug: "geography-countries", topic: "Geography & Countries", level: "intermediate", keywords: ["country", "city", "village", "mountain", "continent", "river", "ocean", "coast", "map", "capital", "border", "region", "nation", "territory", "landscape"] },
  { slug: "relationships-social", topic: "Relationships & Social", level: "beginner", keywords: ["friend", "relationship", "neighbor", "colleague", "partner", "community", "social", "group", "meeting", "chat", "contact", "family", "relative", "support", "bond"] },
  { slug: "holidays-celebrations", topic: "Holidays & Celebrations", level: "beginner", keywords: ["holiday", "celebration", "festival", "birthday", "christmas", "new year", "wedding", "party", "anniversary", "ceremony", "gift", "present", "tradition", "event", "fireworks"] },
  { slug: "entertainment-movies", topic: "Entertainment & Movies", level: "beginner", keywords: ["movie", "film", "actor", "actress", "show", "entertainment", "series", "theater", "cinema", "scene", "screen", "episode", "audience", "director", "music"] },
  { slug: "hobbies-interests", topic: "Hobbies & Interests", level: "beginner", keywords: ["hobby", "interest", "reading", "collecting", "gardening", "photography", "chess", "game", "gaming", "drawing", "cooking", "travel", "craft", "music", "sport"] },
  { slug: "common-verbs", topic: "Common Verbs", level: "beginner", keywords: [] },
  { slug: "common-adjectives", topic: "Common Adjectives", level: "beginner", keywords: [] },
  { slug: "common-phrases-expressions", topic: "Common Phrases & Expressions", level: "beginner", keywords: [] },
  { slug: "accidents-emergency", topic: "Accidents & Emergency", level: "intermediate", keywords: ["accident", "emergency", "fire", "ambulance", "police", "rescue", "injured", "injury", "wound", "help", "danger", "alarm", "hospital", "safety"] },
  { slug: "beauty-personal-care", topic: "Beauty & Personal Care", level: "beginner", keywords: ["beauty", "makeup", "skin", "hair", "salon", "barber", "shampoo", "cream", "lotion", "perfume", "face", "nail", "style", "grooming"] },
  { slug: "cooking-recipes", topic: "Cooking & Recipes", level: "beginner", keywords: ["cook", "cooking", "recipe", "ingredient", "kitchen", "oven", "boil", "fry", "bake", "stir", "mix", "slice", "grill", "dish", "meal"] },
  { slug: "transportation", topic: "Transportation", level: "beginner", keywords: ["car", "bus", "train", "bike", "bicycle", "motorcycle", "truck", "road", "transport", "drive", "driver", "traffic", "station", "airport", "flight", "vehicle"] },
];

const topicMap = new Map(topicDefinitions.map((t) => [t.topic, t]));

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMeaning(text) {
  return String(text || "")
    .replace(/\(.*?\)/g, " ")
    .replace(/\[.*?\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractWord(line) {
  return (line.match(/^(.*?)###/) || [])[1]?.trim() || "";
}

function extractMeanings(line) {
  const matches = [...line.matchAll(/-\s*([^|\[]+)/g)].map((m) => cleanMeaning(m[1]));
  return matches.filter(Boolean);
}

function extractType(line) {
  return ((line.match(/(?<=\*).*?(?=\|)/g) || []).join(" ")).trim();
}

function arpaToIpa(arpa) {
  const map = {
    "AH": "ə", "EH": "ɛ", "IH": "ɪ", "UH": "ʊ", "AO": "ɔ", "AA": "ɑ",
    "EY": "eɪ", "AY": "aɪ", "OW": "oʊ", "OY": "ɔɪ", "AW": "aʊ", "ER": "ɜ",
    "B": "b", "D": "d", "F": "f", "G": "ɡ", "H": "h", "K": "k", "L": "l",
    "M": "m", "N": "n", "P": "p", "R": "r", "S": "s", "T": "t", "V": "v",
    "W": "w", "Y": "j", "Z": "z", "CH": "tʃ", "DH": "ð", "JH": "dʒ",
    "NG": "ŋ", "SH": "ʃ", "TH": "θ", "ZH": "ʒ"
  };

  return String(arpa)
    .split(/\s+/)
    .map(token => {
      const base = token.replace(/[0-9]/g, "");
      return map[base] || "";
    })
    .join("")
    .trim();
}

function getPronunciation(word) {
  const key = normalize(word);
  const variants = [key, key.replace(/\s/g, ""), key.replace(/-/g, " ")];
  
  for (const variant of variants) {
    let pron = cmuDictionary[variant];
    if (!pron && variant.includes(" ")) {
      const parts = variant.split(/\s+/);
      const arpaList = parts.map(p => cmuDictionary[p]).filter(Boolean);
      if (arpaList.length > 0) pron = arpaList.join(" ");
    }
    if (pron) return `/${arpaToIpa(pron)}/`;
  }
  return "";
}

function classifyTopic(word, meaning, type) {
  const text = normalize([word, meaning, type].join(" "));
  for (const topic of topicDefinitions) {
    if (topic.keywords.some(kw => text.includes(normalize(kw)))) {
      return topic;
    }
  }
  return topicMap.get("Common Phrases & Expressions");
}

function generateExample(topic, word) {
  const examples = {
    "Daily Life": `I ${word} every day.`,
    "Food & Drink": `I enjoy ${word}.`,
    "Clothes & Fashion": `She wore ${word}.`,
    "Jobs & Occupations": `Work requires ${word}.`,
    "Travel": `We visited ${word}.`,
    "Shopping": `I bought ${word}.`,
    "Health": `Health requires ${word}.`,
    "Education": `Students learn ${word}.`,
    "Family": `My family likes ${word}.`,
    "Technology": `Technology uses ${word}.`,
    "Environment": `Nature needs ${word}.`,
    "Business": `Business involves ${word}.`,
    "Science": `Scientists study ${word}.`,
    "Emotions": `I felt ${word}.`,
    "Nature": `Nature has ${word}.`,
    "Sports & Fitness": `Athletes need ${word}.`,
    "Music & Arts": `Arts include ${word}.`,
    "Animals & Pets": `Many love ${word}.`,
    "Colors & Shapes": `The shape is ${word}.`,
    "Numbers & Counting": `Count ${word}.`,
    "Time & Dates": `The time is ${word}.`,
    "Weather & Climate": `Weather brings ${word}.`,
    "Geography & Countries": `The map shows ${word}.`,
    "Relationships & Social": `People enjoy ${word}.`,
    "Holidays & Celebrations": `We celebrate ${word}.`,
    "Entertainment & Movies": `Films feature ${word}.`,
    "Hobbies & Interests": `I enjoy ${word}.`,
    "Common Verbs": `I ${word} daily.`,
    "Common Adjectives": `That is ${word}.`,
    "Common Phrases & Expressions": `People say "${word}".`,
    "Accidents & Emergency": `Emergency involves ${word}.`,
    "Beauty & Personal Care": `Beauty uses ${word}.`,
    "Cooking & Recipes": `Recipes use ${word}.`,
    "Transportation": `Transport uses ${word}.`
  };
  return examples[topic] || `I learned ${word}.`;
}

function build() {
  const raw = fs.readFileSync(dictionaryPath, "utf8");
  const lines = raw.split(/\r?\n/).slice(3);
  
  const records = [];
  const counts = {};
  const seen = new Set();
  
  for (const topic of topicDefinitions) {
    counts[topic.topic] = 0;
  }

  for (const line of lines) {
    if (records.length >= TARGET_TOTAL) break;
    if (!line.includes("###")) continue;

    const word = extractWord(line);
    if (!word || !/^[A-Za-z0-9][A-Za-z0-9\s'\-.,()]+$/.test(word)) continue;

    const meanings = extractMeanings(line);
    if (!meanings.length) continue;

    const key = normalize(word);
    if (seen.has(key)) continue;

    const topic = classifyTopic(word, meanings[0], extractType(line));
    if (!topic || counts[topic.topic] >= MAX_PER_TOPIC) continue;

    records.push({
      word,
      meaning: meanings[0],
      pronunciation: getPronunciation(word),
      example: generateExample(topic.topic, word),
      topic: topic.topic,
      level: topic.level,
      image: `/images/vocabulary-cards/${word.toLowerCase().replace(/\s+/g, "-")}.svg`
    });

    counts[topic.topic]++;
    seen.add(key);
  }

  return records;
}

export const seedVocabularyData = build();
