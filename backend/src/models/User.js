import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    dailyGoal: {
      type: Number,
      default: 20,
      min: 5,
      max: 120,
    },
    todayMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastGoalDate: {
      type: Date,
      default: null,
    },
    lastActiveDate: {
      type: Date,
      default: null,
    },
    achievements: {
      type: [
        {
          key: {
            type: String,
            required: true,
            trim: true,
          },
          title: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
          },
          unlockedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
