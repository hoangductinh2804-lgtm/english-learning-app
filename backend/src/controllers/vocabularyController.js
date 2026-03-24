import { Vocabulary } from "../models/Vocabulary.js";

const LEVELS = ["beginner", "intermediate", "advanced"];

function buildFilters(query) {
  const filters = {};

  if (query.level && LEVELS.includes(query.level)) {
    filters.level = query.level;
  }

  if (query.topic) {
    filters.topic = query.topic;
  }

  return filters;
}

export async function getAllVocabulary(req, res) {
  try {
    const filters = buildFilters(req.query);

    const vocabulary = await Vocabulary.find(filters).sort({ createdAt: -1 });
    const topics = await Vocabulary.distinct("topic");

    return res.status(200).json({
      count: vocabulary.length,
      topics,
      vocabulary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch vocabulary", error: error.message });
  }
}

export async function getVocabularyByLevel(req, res) {
  try {
    const { level } = req.params;

    if (!LEVELS.includes(level)) {
      return res.status(400).json({ message: "Invalid level" });
    }

    const vocabulary = await Vocabulary.find({ level }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: vocabulary.length,
      vocabulary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch vocabulary by level", error: error.message });
  }
}

export async function getVocabularyByTopic(req, res) {
  try {
    const { topic } = req.params;

    const vocabulary = await Vocabulary.find({ topic }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: vocabulary.length,
      vocabulary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch vocabulary by topic", error: error.message });
  }
}
