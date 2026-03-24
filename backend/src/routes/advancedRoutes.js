import { Router } from "express";
import {
  correctWriting,
  getListeningTracks,
  getReadingArticles,
  getSpeakingPrompts,
} from "../controllers/advancedController.js";

const router = Router();

router.get("/listening", getListeningTracks);
router.get("/speaking-prompts", getSpeakingPrompts);
router.get("/reading", getReadingArticles);
router.post("/writing/correct", correctWriting);

export default router;