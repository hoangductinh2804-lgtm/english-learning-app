import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { applyGamification } from "../utils/gamification.js";

// Cap todayMinutes at twice the daily goal so a user can't inflate their
// progress counter beyond a reasonable overflow buffer.
const MAX_DAILY_GOAL_MULTIPLIER = 2;

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    level: user.level,
    points: user.points,
    streak: user.streak,
    dailyGoal: user.dailyGoal ?? 20,
    todayMinutes: user.todayMinutes ?? 0,
    achievements: user.achievements || [],
  };
}

export async function register(req, res) {
  try {
    const { fullName, email, password, level } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: passwordHash,
      level: level || "beginner",
    });

    const token = signToken(user._id);

    return res.status(201).json({
      message: "Register successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Register failed", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { fullName, level, dailyGoal, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName !== undefined) {
      if (typeof fullName !== "string" || fullName.trim().length < 2 || fullName.trim().length > 100) {
        return res.status(400).json({ message: "fullName must be between 2 and 100 characters" });
      }
      user.fullName = fullName.trim();
    }

    if (level !== undefined) {
      if (!["beginner", "intermediate", "advanced"].includes(level)) {
        return res.status(400).json({ message: "level must be beginner, intermediate, or advanced" });
      }
      user.level = level;
    }

    if (dailyGoal !== undefined) {
      const goal = Number(dailyGoal);
      if (Number.isNaN(goal) || goal < 5 || goal > 120) {
        return res.status(400).json({ message: "dailyGoal must be between 5 and 120 minutes" });
      }
      user.dailyGoal = goal;
    }

    if (newPassword !== undefined) {
      if (!currentPassword) {
        return res.status(400).json({ message: "currentPassword is required to set a new password" });
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "newPassword must be at least 6 characters" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Profile update failed", error: error.message });
  }
}

export async function logActivity(req, res) {
  try {
    const { minutes } = req.body;
    const mins = Number(minutes);

    if (Number.isNaN(mins) || mins <= 0) {
      return res.status(400).json({ message: "minutes must be a positive number" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastGoal = user.lastGoalDate ? new Date(user.lastGoalDate) : null;
    if (lastGoal) {
      lastGoal.setHours(0, 0, 0, 0);
    }

    if (!lastGoal || lastGoal.getTime() !== today.getTime()) {
      user.todayMinutes = 0;
      user.lastGoalDate = today;
    }

    user.todayMinutes = Math.min((user.todayMinutes || 0) + mins, user.dailyGoal * MAX_DAILY_GOAL_MULTIPLIER);

    await applyGamification(user, { pointsEarned: Math.ceil(mins / 5) });

    return res.status(200).json({
      message: "Activity logged",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log activity", error: error.message });
  }
}
