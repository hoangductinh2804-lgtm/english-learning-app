import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  const user = req.user;
  res.status(200).json({
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      level: user.level,
      points: user.points,
      streak: user.streak,
      dailyGoal: user.dailyGoal ?? 20,
      todayMinutes: user.todayMinutes ?? 0,
      achievements: user.achievements || [],
    },
  });
});

export default router;
