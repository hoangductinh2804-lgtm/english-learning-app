import { seedGrammarLessons } from "../data/seedGrammarData.js";
import { GrammarLesson } from "../models/GrammarLesson.js";

async function ensureSeedLessons() {
  const count = await GrammarLesson.countDocuments();
  if (count === 0) {
    await GrammarLesson.insertMany(seedGrammarLessons);
  }
}

export async function getAllGrammarLessons(req, res) {
  try {
    await ensureSeedLessons();

    const filters = {};
    if (req.query.level) {
      filters.level = req.query.level;
    }

    const lessons = await GrammarLesson.find(filters)
      .select("tense title summary level")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch grammar lessons",
      error: error.message,
    });
  }
}

export async function getGrammarLessonByTense(req, res) {
  try {
    await ensureSeedLessons();

    const tense = String(req.params.tense || "").toLowerCase();
    const lesson = await GrammarLesson.findOne({ tense });

    if (!lesson) {
      return res.status(404).json({ message: "Grammar lesson not found" });
    }

    return res.status(200).json({ lesson });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch grammar lesson",
      error: error.message,
    });
  }
}

export async function getGrammarQuizByTense(req, res) {
  try {
    await ensureSeedLessons();

    const tense = String(req.params.tense || "").toLowerCase();
    const lesson = await GrammarLesson.findOne({ tense }).select("tense title quiz");

    if (!lesson) {
      return res.status(404).json({ message: "Grammar lesson not found" });
    }

    return res.status(200).json({
      tense: lesson.tense,
      title: lesson.title,
      quiz: lesson.quiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch grammar quiz",
      error: error.message,
    });
  }
}