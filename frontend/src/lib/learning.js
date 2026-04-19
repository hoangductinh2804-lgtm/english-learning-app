import { getVocabulary } from "../api/client";
import { buildCategories, buildStudyDecks } from "../data/vocabularyBank";

const fallbackCategories = buildCategories();
const studyDecks = buildStudyDecks(fallbackCategories);
const fallbackCategoryMeta = new Map(
  fallbackCategories.map((category) => [category.slug, {
    icon: category.icon,
    cover: category.cover,
    description: category.description,
  }])
);

const STORAGE_KEY = "ela_learning_progress_v1";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createFallbackWord(topicSlug, word, index) {
  return {
    _id: `${topicSlug}-${index}-${slugify(word.word)}`,
    topic: topicSlug,
    word: word.word,
    ipa: word.ipa || word.pronunciation || "",
    meaning: word.meaning || "",
    example: word.example || "",
    image: word.image || `/images/vocabulary-cards/${slugify(word.word)}.svg`,
  };
}

function normalizeApiWord(topicSlug, word, index) {
  return {
    _id: word._id || `${topicSlug}-${index}-${slugify(word.word)}`,
    topic: word.topic || topicSlug,
    word: word.word,
    ipa: word.ipa || word.pronunciation || "",
    meaning: word.meaning || "",
    example: word.example || "",
    image: word.image || `/images/vocabulary-cards/${slugify(word.word)}.svg`,
  };
}

function mergeFallbackWords(categories) {
  return categories.map((category) => {
    if ((category.words || []).length > 0) {
      return {
        ...category,
        source: category.source || "api",
        words: category.words.map((word, index) => normalizeApiWord(category.slug, word, index)),
      };
    }

    const fallbackWords = studyDecks[category.slug] || [];
    return {
      ...category,
      source: "fallback",
      words: fallbackWords.map((word, index) => createFallbackWord(category.slug, word, index)),
    };
  });
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { remembered: {}, liked: {}, activityDays: {} };
    }

    const parsed = JSON.parse(raw);
    return {
      remembered: parsed.remembered || {},
      liked: parsed.liked || {},
      activityDays: parsed.activityDays || {},
    };
  } catch (_error) {
    return { remembered: {}, liked: {}, activityDays: {} };
  }
}

function writeStore(nextStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStore));
}

function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function markTodayActivity(store) {
  const key = toDateKey();
  store.activityDays = store.activityDays || {};
  store.activityDays[key] = true;
}

function getStreakDaysFromMap(activityDays = {}) {
  const keys = Object.keys(activityDays)
    .filter((key) => activityDays[key])
    .sort((a, b) => (a < b ? 1 : -1));

  if (keys.length === 0) {
    return 0;
  }

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (let index = 0; index < 3650; index += 1) {
    const key = toDateKey(cursor);
    if (!activityDays[key]) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getLearningStore() {
  return readStore();
}

export function toggleRemembered(wordId) {
  const store = readStore();
  store.remembered[wordId] = !store.remembered[wordId];
  markTodayActivity(store);
  writeStore(store);
  return store;
}

export function toggleLiked(wordId) {
  const store = readStore();
  store.liked[wordId] = !store.liked[wordId];
  markTodayActivity(store);
  writeStore(store);
  return store;
}

export function getCurrentStreakDays() {
  const store = readStore();
  return getStreakDaysFromMap(store.activityDays || {});
}

export async function loadCategoryCatalog() {
  try {
    const result = await getVocabulary();
    const words = result.vocabulary || [];
    const grouped = new Map();

    words.forEach((item) => {
      const topic = item.topic || "General";
      const slug = slugify(topic);

      if (!grouped.has(slug)) {
        const meta = fallbackCategoryMeta.get(slug);
        grouped.set(slug, {
          slug,
          title: topic,
          icon: meta?.icon || "📘",
          cover: meta?.cover || "/images/topics/daily-life.svg",
          description: meta?.description || `Tu vung theo chu de ${topic}`,
          source: "api",
          words: [],
        });
      }

      grouped.get(slug).words.push(item);
    });

    const fromApi = Array.from(grouped.values()).sort((a, b) => a.title.localeCompare(b.title));
    return mergeFallbackWords(fromApi.length > 0 ? fromApi : fallbackCategories);
  } catch (_error) {
    return mergeFallbackWords(
      fallbackCategories.map((category) => ({
        ...category,
        source: "fallback",
      }))
    );
  }
}

export function getProgressByCategory(categories) {
  const store = readStore();

  return categories.map((category) => {
    const total = category.words?.length || category.flashcardsTotal || 0;
    const remembered = (category.words || []).filter((word) => store.remembered[word._id]).length;

    return {
      slug: category.slug,
      remembered,
      total,
      percent: total === 0 ? 0 : Math.round((remembered / total) * 100),
    };
  });
}

export function findWordsBySlug(categories, slug) {
  return categories.find((item) => item.slug === slug)?.words || [];
}
