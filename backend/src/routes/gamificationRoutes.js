import { Router } from "express";
import { getLeaderboard, getMyGamification } from "../controllers/gamificationController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", requireAuth, getMyGamification);
router.get("/leaderboard", getLeaderboard);

export default router;