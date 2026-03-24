import {
  listeningTracks,
  readingArticles,
  speakingPrompts,
} from "../data/advancedContentData.js";

const writingRules = [
  {
    pattern: /\bi\b/g,
    replacement: "I",
    reason: "Capitalize pronoun 'I'.",
  },
  {
    pattern: /\bdont\b/gi,
    replacement: "don't",
    reason: "Use apostrophe in negative form.",
  },
  {
    pattern: /\bcant\b/gi,
    replacement: "can't",
    reason: "Use apostrophe in contraction.",
  },
  {
    pattern: /\bwanna\b/gi,
    replacement: "want to",
    reason: "Use formal written form in essays.",
  },
  {
    pattern: /\bgonna\b/gi,
    replacement: "going to",
    reason: "Use formal written form in essays.",
  },
  {
    pattern: /\bcuz\b/gi,
    replacement: "because",
    reason: "Avoid informal abbreviation.",
  },
];

function ensureSentenceEnding(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return "";
  }

  const lastChar = trimmed[trimmed.length - 1];
  if ([".", "!", "?"].includes(lastChar)) {
    return trimmed;
  }

  return `${trimmed}.`;
}

function splitSentences(text) {
  return text
    .split(/[.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getListeningTracks(_req, res) {
  return res.status(200).json({ count: listeningTracks.length, tracks: listeningTracks });
}

export async function getSpeakingPrompts(_req, res) {
  return res.status(200).json({ count: speakingPrompts.length, prompts: speakingPrompts });
}

export async function getReadingArticles(_req, res) {
  return res.status(200).json({ count: readingArticles.length, articles: readingArticles });
}

export async function correctWriting(req, res) {
  const rawText = String(req.body?.text || "").trim();

  if (!rawText) {
    return res.status(400).json({ message: "text is required" });
  }

  let correctedText = rawText;
  const suggestions = [];

  for (const rule of writingRules) {
    if (rule.pattern.test(correctedText)) {
      correctedText = correctedText.replace(rule.pattern, rule.replacement);
      suggestions.push(rule.reason);
    }
  }

  correctedText = ensureSentenceEnding(correctedText);

  const wordCount = correctedText.split(/\s+/).filter(Boolean).length;
  const sentenceCount = splitSentences(correctedText).length;

  if (sentenceCount < 2) {
    suggestions.push("Try writing at least 2 sentences for richer ideas.");
  }

  if (wordCount < 40) {
    suggestions.push("Try to write at least 40 words to practice detail and coherence.");
  }

  let score = 100;
  score -= Math.min(suggestions.length * 8, 40);
  score = Math.max(score, 50);

  return res.status(200).json({
    originalText: rawText,
    correctedText,
    score,
    wordCount,
    sentenceCount,
    suggestions,
  });
}