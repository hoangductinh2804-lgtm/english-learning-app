import { Router } from "express";
import { getMyProgress, reviewVocabulary } from "../controllers/progressController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getMyProgress);
router.post("/review/:vocabularyId", requireAuth, reviewVocabulary);

export default router;
