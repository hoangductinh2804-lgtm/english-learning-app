import { User } from "../models/User.js";

function serializeAchievement(item) {
  return {
    key: item.key,
    title: item.title,
    description: item.description,
    unlockedAt: item.unlockedAt,
  };
}

export async function getMyGamification(req, res) {
  try {
    const user = await User.findById(req.user._id).select("fullName level points streak achievements");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      profile: {
        id: user._id,
        fullName: user.fullName,
        level: user.level,
        points: user.points,
        streak: user.streak,
      },
      achievements: (user.achievements || []).map(serializeAchievement),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch gamification profile",
      error: error.message,
    });
  }
}

export async function getLeaderboard(req, res) {
  try {
    const rawLimit = Number(req.query.limit || 10);
    const limit = Number.isNaN(rawLimit) ? 10 : Math.min(Math.max(rawLimit, 1), 100);

    const users = await User.find({})
      .select("fullName level points streak")
      .sort({ points: -1, streak: -1, updatedAt: 1 })
      .limit(limit);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      fullName: user.fullName,
      level: user.level,
      points: user.points,
      streak: user.streak,
    }));

    return res.status(200).json({
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
}