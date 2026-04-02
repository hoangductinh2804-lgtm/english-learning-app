import { getVocabulary } from "../api/client";
import { categories as fallbackCategories, studyDecks } from "../data/studyData";

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
    ipa: word.ipa || "",
    meaning: word.meaning || "",
    example: word.example || "",
    image: word.image || "",
  };
}

function mergeFallbackWords(categories) {
  return categories.map((category) => {
    if ((category.words || []).length > 0) {
      return category;
    }

    const fallbackWords = studyDecks[category.slug] || [];
    return {
      ...category,
      words: fallbackWords.map((word, index) => createFallbackWord(category.slug, word, index)),
    };
  });
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { remembered: {}, liked: {} };
    }

    const parsed = JSON.parse(raw);
    return {
      remembered: parsed.remembered || {},
      liked: parsed.liked || {},
    };
  } catch (_error) {
    return { remembered: {}, liked: {} };
  }
}

function writeStore(nextStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStore));
}

export function getLearningStore() {
  return readStore();
}

export function toggleRemembered(wordId) {
  const store = readStore();
  store.remembered[wordId] = !store.remembered[wordId];
  writeStore(store);
  return store;
}

export function toggleLiked(wordId) {
  const store = readStore();
  store.liked[wordId] = !store.liked[wordId];
  writeStore(store);
  return store;
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
        grouped.set(slug, {
          slug,
          title: topic,
          icon: "📘",
          description: `Tu vung theo chu de ${topic}`,
          words: [],
        });
      }

      grouped.get(slug).words.push(item);
    });

    const fromApi = Array.from(grouped.values()).sort((a, b) => a.title.localeCompare(b.title));
    return mergeFallbackWords(fromApi.length > 0 ? fromApi : fallbackCategories);
  } catch (_error) {
    return mergeFallbackWords(fallbackCategories);
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
