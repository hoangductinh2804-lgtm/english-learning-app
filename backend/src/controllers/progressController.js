import mongoose from "mongoose";
import { Progress } from "../models/Progress.js";
import { User } from "../models/User.js";
import { applyGamification } from "../utils/gamification.js";

export async function getMyProgress(req, res) {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate("vocabulary")
      .sort({ updatedAt: -1 });

    return res.status(200).json({ count: progress.length, progress });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch progress", error: error.message });
  }
}

export async function reviewVocabulary(req, res) {
  try {
    const { vocabularyId } = req.params;
    const { isCorrect, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(vocabularyId)) {
      return res.status(400).json({ message: "Invalid vocabulary id" });
    }

    const update = {
      $set: {
        status: status || "learning",
        lastReviewedAt: new Date(),
      },
      $setOnInsert: {
        user: req.user._id,
        vocabulary: vocabularyId,
      },
      $inc: {
        correctCount: isCorrect ? 1 : 0,
        incorrectCount: isCorrect ? 0 : 1,
      },
    };

    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, vocabulary: vocabularyId },
      update,
      { new: true, upsert: true }
    ).populate("vocabulary");

    const user = await User.findById(req.user._id);
    if (user) {
      const pointsEarned = isCorrect ? 2 : 1;
      await applyGamification(user, { pointsEarned });
    }

    return res.status(200).json({ message: "Progress updated", progress });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update progress", error: error.message });
  }
}
