import { Router } from "express";
import { getAllQuestions, submitQuizAnswers } from "../controllers/questionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllQuestions);
router.post("/submit", requireAuth, submitQuizAnswers);

export default router;