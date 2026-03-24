import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    vocabulary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vocabulary",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["new", "learning", "mastered"],
      default: "new",
    },
    correctCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    incorrectCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastReviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, vocabulary: 1 }, { unique: true });

export const Progress = mongoose.model("Progress", progressSchema);
