import { Router } from "express";
import {
  correctWriting,
  getConversations,
  getListeningTracks,
  getSpeakingPrompts,
} from "../controllers/advancedController.js";

const router = Router();

router.get("/listening", getListeningTracks);
router.get("/speaking-prompts", getSpeakingPrompts);
router.get("/conversations", getConversations);
router.post("/writing/correct", correctWriting);

export default router;