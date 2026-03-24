import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      default: [],
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const grammarLessonSchema = new mongoose.Schema(
  {
    tense: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    rules: {
      type: [String],
      default: [],
    },
    structure: {
      affirmative: {
        type: String,
        trim: true,
      },
      negative: {
        type: String,
        trim: true,
      },
      question: {
        type: String,
        trim: true,
      },
    },
    examples: {
      type: [
        {
          sentence: {
            type: String,
            trim: true,
          },
          translation: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
    quiz: {
      type: [exerciseSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const GrammarLesson = mongoose.model("GrammarLesson", grammarLessonSchema);