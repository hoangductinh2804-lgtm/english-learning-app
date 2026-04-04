import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { dictionary as cmuDictionary } from "cmu-pronouncing-dictionary";

const require = createRequire(import.meta.url);
const tratuPackagePath = path.dirname(require.resolve("tratu/package.json"));
const dictionaryPath = path.join(tratuPackagePath, "data", "av.txt");

const MAX_PER_TOPIC = 180;
const TARGET_TOTAL = 5200;

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
  { slug: "common-verbs", topic: "Common Verbs", level: "beginner", keywords: [], fallback: "verb" },
  { slug: "common-adjectives", topic: "Common Adjectives", level: "beginner", keywords: [], fallback: "adjective" },
  { slug: "common-phrases-expressions", topic: "Common Phrases & Expressions", level: "beginner", keywords: [], fallback: "phrase" },
  { slug: "accidents-emergency", topic: "Accidents & Emergency", level: "intermediate", keywords: ["accident", "emergency", "fire", "ambulance", "police", "rescue", "injured", "injury", "wound", "help", "danger", "alarm", "hospital", "safety"] },
  { slug: "beauty-personal-care", topic: "Beauty & Personal Care", level: "beginner", keywords: ["beauty", "makeup", "skin", "hair", "salon", "barber", "shampoo", "cream", "lotion", "perfume", "face", "nail", "style", "grooming"] },
  { slug: "cooking-recipes", topic: "Cooking & Recipes", level: "beginner", keywords: ["cook", "cooking", "recipe", "ingredient", "kitchen", "oven", "boil", "fry", "bake", "stir", "mix", "slice", "grill", "dish", "meal"] },
  { slug: "transportation", topic: "Transportation", level: "beginner", keywords: ["car", "bus", "train", "bike", "bicycle", "motorcycle", "truck", "road", "transport", "drive", "driver", "traffic", "station", "airport", "flight", "vehicle"] },
];

const topicMap = new Map(topicDefinitions.map((topic) => [topic.slug, topic]));
const fallbackTopicSlugs = ["common-verbs", "common-adjectives", "common-phrases-expressions"];

const arpaToIpa = {
  AA: "ɑ", AE: "æ", AH: "ə", AO: "ɔ", AW: "aʊ", AY: "aɪ", B: "b", CH: "tʃ", D: "d", DH: "ð", EH: "ɛ", ER: "ɜː", EY: "eɪ", F: "f", G: "ɡ", HH: "h", IH: "ɪ", IY: "iː", JH: "dʒ", K: "k", L: "l", M: "m", N: "n", NG: "ŋ", OW: "oʊ", OY: "ɔɪ", P: "p", R: "r", S: "s", SH: "ʃ", T: "t", TH: "θ", UH: "ʊ", UW: "uː", V: "v", W: "w", Y: "j", Z: "z", ZH: "ʒ",
};

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeText(value).replace(/['']/g, "").replace(/\s+/g, "-");
}

function cleanMeaning(value) {
  return String(value || "")
    .replace(/\(([^)]*)\)/g, " ")
    .replace(/\[([^\]]*)\]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[\s\-:|]+/, "")
    .trim();
}

function extractWord(line) {
  return (line.match(/^(.*?)###/) || [])[1]?.trim() || "";
}

function extractType(line) {
  return ((line.match(/(?<=\*).*?(?=\|)/g) || []).join(" ")).trim();
}

function extractMeanings(line) {
  const matches = [...line.matchAll(/-\s*([^|\[]+)/g)].map((entry) => cleanMeaning(entry[1]));
  return matches.filter(Boolean);
}

function hasVerbHint(text) {
  return /(\bverb\b|\bvt\b|\bdt\b|động từ|to\s+[a-z]|\bcan\b|\bmay\b|\bshould\b)/i.test(text);
}

function hasAdjectiveHint(text) {
  return /(\badj\b|\btt\b|tính từ|\bdescribing\b|\bqualifier\b)/i.test(text);
}

function pickFallbackTopic(word, meaning, type) {
  const normalizedWord = normalizeText(word);
  const normalizedMeaning = normalizeText(meaning);
  const normalizedType = normalizeText(type);

  if (normalizedWord.includes(" ") || normalizedWord.includes("-") || normalizedWord.includes("'")) {
    return topicMap.get("common-phrases-expressions");
  }

  if (hasVerbHint(normalizedType) || hasVerbHint(normalizedMeaning)) {
    return topicMap.get("common-verbs");
  }

  if (hasAdjectiveHint(normalizedType) || hasAdjectiveHint(normalizedMeaning) || /(ful|less|able|ible|ive|ous|al|ic|ish|ary|ant|ent|y)$/.test(normalizedWord)) {
    return topicMap.get("common-adjectives");
  }

  const index = Math.abs(hashCode(normalizedWord)) % 3;
  return topicMap.get(fallbackTopicSlugs[index]);
}

function hashCode(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return hash;
}

function classifyTopic(word, meaning, type) {
  const haystack = normalizeText([word, meaning, type].join(" "));

  for (const topic of topicDefinitions) {
    if (!topic.keywords.length) {
      continue;
    }

    if (topic.keywords.some((keyword) => haystack.includes(normalizeText(keyword)))) {
      return topic;
    }
  }

  return pickFallbackTopic(word, meaning, type);
}

function lookupPronunciation(word) {
  const key = normalizeText(word).replace(/\s+/g, " ");
  const lookupKeys = [key, key.replace(/\s/g, ""), key.replace(/-/g, " ")];

  for (const lookupKey of lookupKeys) {
    const pronunciation = cmuDictionary[lookupKey] || cmuDictionary[`${lookupKey}(1)`] || cmuDictionary[`${lookupKey}(2)`];
    if (pronunciation) {
      return `/${arpaToIpaString(pronunciation)}/`;
    }
  }

  const parts = key.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    const convertedParts = parts.map((part) => cmuDictionary[part]).filter(Boolean);
    if (convertedParts.length > 0) {
      return `/${convertedParts.map((part) => arpaToIpaString(part)).join(" ")}/`;
    }
  }

  return "";
}

function arpaToIpaString(value) {
  return String(value)
    .split(/\s+/)
    .map((token) => {
      const base = token.replace(/[0-9]/g, "");
      if (base === "AH") {
        return token.endsWith("1") || token.endsWith("2") ? "ʌ" : "ə";
      }
      if (base === "ER") {
        return token.endsWith("0") ? "ər" : "ɜːr";
      }
      if (base === "AO") {
        return "ɔː";
      }
      if (base === "AA") {
        return "ɑː";
      }
      if (base === "EY") {
        return "eɪ";
      }
      if (base === "OW") {
        return "oʊ";
      }
      if (base === "UW") {
        return "uː";
      }
      if (base === "IY") {
        return "iː";
      }
      if (base === "IH") {
        return "ɪ";
      }
      if (base === "EH") {
        return "ɛ";
      }
      if (base === "UH") {
        return "ʊ";
      }
      if (base === "AW") {
        return "aʊ";
      }
      if (base === "AY") {
        return "aɪ";
      }
      if (base === "OY") {
        return "ɔɪ";
      }
      if (arpaToIpa[base]) {
        return arpaToIpa[base];
      }
      return "";
    })
    .join("")
    .replace(/\/+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generateExample(topic, word) {
  const topicExamples = {
    "Daily Life": `I use ${word} in my daily routine.`,
    "Food & Drink": `We enjoyed ${word} at lunch.`,
    "Clothes & Fashion": `She chose ${word} for the trip.`,
    "Jobs & Occupations": `The team uses ${word} at work.`,
    "Travel": `We saw ${word} during the trip.`,
    "Shopping": `I bought ${word} at the market.`,
    "Health": `The doctor explained ${word}.`,
    "Education": `Students often learn ${word} in class.`,
    "Family": `My family talks about ${word} often.`,
    "Technology": `This device supports ${word} well.`,
    "Environment": `We need to protect ${word}.`,
    "Business": `The company discussed ${word} today.`,
    "Science": `Scientists study ${word} carefully.`,
    "Emotions": `I felt ${word} yesterday.`,
    "Nature": `We saw ${word} in the countryside.`,
    "Sports & Fitness": `Athletes practice ${word} regularly.`,
    "Music & Arts": `The class enjoyed ${word}.`,
    "Animals & Pets": `Children love ${word}.`,
    "Colors & Shapes": `Please draw ${word} on the paper.`,
    "Numbers & Counting": `We counted ${word} items.`,
    "Time & Dates": `We wrote ${word} on the calendar.`,
    "Weather & Climate": `Today the forecast mentions ${word}.`,
    "Geography & Countries": `The map shows ${word}.`,
    "Relationships & Social": `They talked about ${word}.`,
    "Holidays & Celebrations": `We celebrated ${word}.`,
    "Entertainment & Movies": `People watched ${word} last night.`,
    "Hobbies & Interests": `My hobby includes ${word}.`,
    "Common Verbs": `I often ${word} every day.`,
    "Common Adjectives": `That idea seems ${word}.`,
    "Common Phrases & Expressions": `People often say "${word}".`,
    "Accidents & Emergency": `The team responded to ${word}.`,
    "Beauty & Personal Care": `She bought ${word} yesterday.`,
    "Cooking & Recipes": `We used ${word} in the recipe.`,
    "Transportation": `We used ${word} to go downtown.`,
  };

  return topicExamples[topic] || `I learned the word ${word} today.`;
}

function normalizeEntry(entry) {
  return {
    word: entry.word,
    meaning: entry.meaning,
    pronunciation: entry.pronunciation,
    example: entry.example,
    topic: entry.topic,
    level: entry.level,
    image: entry.image,
  };
}

function parseDictionaryLines(lines) {
  const records = [];
  const seen = new Set();
  const counts = Object.fromEntries(topicDefinitions.map((topic) => [topic.topic, 0]));

  for (const line of lines) {
    if (!line.includes("###")) {
      continue;
    }

    const word = extractWord(line);
    if (!word || !/^[A-Za-z0-9][A-Za-z0-9\s'\-.,()]+$/.test(word)) {
      continue;
    }

    const meanings = extractMeanings(line);
    const meaning = meanings[0];
    if (!meaning) {
      continue;
    }

    const key = normalizeText(word);
    if (seen.has(key)) {
      continue;
    }

    const type = extractType(line);
    const topic = classifyTopic(word, meaning, type);
    if (!topic) {
      continue;
    }

    if ((counts[topic.topic] || 0) >= MAX_PER_TOPIC) {
      continue;
    }

    const pronunciation = lookupPronunciation(word);
    const image = `/images/vocabulary-cards/${slugify(word)}.svg`;

    records.push(
      normalizeEntry({
        word,
        meaning,
        pronunciation,
        example: generateExample(topic.topic, word),
        topic: topic.topic,
        level: topic.level,
        image,
      })
    );

    counts[topic.topic] += 1;
    seen.add(key);

    if (records.length >= TARGET_TOTAL) {
      break;
    }
  }

  return { records, counts };
}

function buildSeedVocabularyData() {
  const raw = fs.readFileSync(dictionaryPath, "utf8");
  const lines = raw.split(/\r?\n/).slice(3);
  const { records, counts } = parseDictionaryLines(lines);

  if (records.length < TARGET_TOTAL) {
    for (const line of lines) {
      if (records.length >= TARGET_TOTAL) {
        break;
      }

      if (!line.includes("###")) {
        continue;
      }

      const word = extractWord(line);
      const key = normalizeText(word);
      if (!word || records.some((entry) => normalizeText(entry.word) === key)) {
        continue;
      }

      const meanings = extractMeanings(line);
      const meaning = meanings[0];
      if (!meaning) {
        continue;
      }

      const type = extractType(line);
      const fallbackTopic = pickFallbackTopic(word, meaning, type) || topicMap.get("common-phrases-expressions");
      if ((counts[fallbackTopic.topic] || 0) >= MAX_PER_TOPIC + 50) {
        continue;
      }

      records.push(
        normalizeEntry({
          word,
          meaning,
          pronunciation: lookupPronunciation(word),
          example: generateExample(fallbackTopic.topic, word),
          topic: fallbackTopic.topic,
          level: fallbackTopic.level,
          image: `/images/vocabulary-cards/${slugify(word)}.svg`,
        })
      );

      counts[fallbackTopic.topic] = (counts[fallbackTopic.topic] || 0) + 1;
    }
  }

  return records.slice(0, TARGET_TOTAL);
}

export const seedVocabularyData = buildSeedVocabularyData();
