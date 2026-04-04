import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
    },
    meaning: {
      type: String,
      required: true,
      trim: true,
    },
    pronunciation: {
      type: String,
      trim: true,
    },
    example: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  { timestamps: true }
);

export const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
