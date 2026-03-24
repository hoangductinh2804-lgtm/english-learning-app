import { seedQuestions } from "../data/seedQuestionData.js";
import { Question } from "../models/Question.js";
import { User } from "../models/User.js";
import { applyGamification } from "../utils/gamification.js";

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => normalizeText(item));
}

function isAnswerCorrect(question, answer) {
  if (question.type === "drag_drop") {
    const expected = normalizeArray(question.correctAnswer);
    const actual = normalizeArray(answer);
    return expected.length > 0 && expected.join("|") === actual.join("|");
  }

  return normalizeText(question.correctAnswer) === normalizeText(answer);
}

async function ensureSeedQuestions() {
  const count = await Question.countDocuments();
  if (count === 0) {
    await Question.insertMany(seedQuestions);
  }
}

export async function getAllQuestions(req, res) {
  try {
    await ensureSeedQuestions();

    const filters = {};
    if (req.query.type) {
      filters.type = req.query.type;
    }
    if (req.query.level) {
      filters.level = req.query.level;
    }

    const questions = await Question.find(filters).sort({ createdAt: -1 });

    return res.status(200).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
}

export async function submitQuizAnswers(req, res) {
  try {
    const answers = Array.isArray(req.body.answers) ? req.body.answers : [];

    if (answers.length === 0) {
      return res.status(400).json({ message: "Answers are required" });
    }

    const questionIds = answers
      .map((item) => item.questionId)
      .filter(Boolean);

    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionMap = questions.reduce((acc, question) => {
      acc[question._id.toString()] = question;
      return acc;
    }, {});

    const resultItems = answers.map((item) => {
      const question = questionMap[item.questionId];

      if (!question) {
        return {
          questionId: item.questionId,
          prompt: "Question not found",
          isCorrect: false,
          userAnswer: item.answer,
          correctAnswer: null,
          explanation: "",
        };
      }

      const correct = isAnswerCorrect(question, item.answer);

      return {
        questionId: question._id,
        type: question.type,
        prompt: question.prompt,
        isCorrect: correct,
        userAnswer: item.answer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation || "",
      };
    });

    const total = resultItems.length;
    const correctCount = resultItems.filter((item) => item.isCorrect).length;
    const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    const pointsEarned = correctCount * 10;

    if (req.user?._id) {
      const user = await User.findById(req.user._id);
      if (user) {
        await applyGamification(user, { pointsEarned });
      }
    }

    return res.status(200).json({
      total,
      correctCount,
      wrongCount: total - correctCount,
      scorePercent,
      pointsEarned,
      resultItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to submit quiz answers",
      error: error.message,
    });
  }
}