const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network request failed");
  }
}

export function register(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(token) {
  return request("/protected/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getVocabulary(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.level) {
    searchParams.set("level", params.level);
  }

  if (params.topic) {
    searchParams.set("topic", params.topic);
  }

  const query = searchParams.toString();
  const path = query ? `/vocabulary?${query}` : "/vocabulary";

  return request(path, { method: "GET" });
}

export function getVocabularyByLevel(level) {
  return request(`/vocabulary/level/${level}`, { method: "GET" });
}

export function getVocabularyByTopic(topic) {
  return request(`/vocabulary/topic/${encodeURIComponent(topic)}`, { method: "GET" });
}

export function getGrammarLessons(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.level) {
    searchParams.set("level", params.level);
  }

  const query = searchParams.toString();
  const path = query ? `/grammar?${query}` : "/grammar";

  return request(path, { method: "GET" });
}

export function getGrammarLessonByTense(tense) {
  return request(`/grammar/tense/${encodeURIComponent(tense)}`, { method: "GET" });
}

export function getGrammarQuizByTense(tense) {
  return request(`/grammar/tense/${encodeURIComponent(tense)}/quiz`, { method: "GET" });
}

export function getQuestions(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.level) {
    searchParams.set("level", params.level);
  }

  const query = searchParams.toString();
  const path = query ? `/questions?${query}` : "/questions";

  return request(path, { method: "GET" });
}

export function submitQuizAnswers(token, payload) {
  return request("/questions/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export function getMyGamification(token) {
  return request("/gamification/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getLeaderboard(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  const query = searchParams.toString();
  const path = query ? `/gamification/leaderboard?${query}` : "/gamification/leaderboard";

  return request(path, { method: "GET" });
}

export function getListeningTracks() {
  return request("/advanced/listening", { method: "GET" });
}

export function getSpeakingPrompts() {
  return request("/advanced/speaking-prompts", { method: "GET" });
}

export function getReadingArticles() {
  return request("/advanced/reading", { method: "GET" });
}

export function correctWriting(text) {
  return request("/advanced/writing/correct", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export function getMyProgress(token) {
  return request("/progress", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function reviewVocabulary(token, vocabularyId, payload) {
  return request(`/progress/review/${vocabularyId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}
