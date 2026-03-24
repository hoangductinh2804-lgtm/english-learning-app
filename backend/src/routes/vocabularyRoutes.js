import { Router } from "express";
import {
  getAllVocabulary,
  getVocabularyByLevel,
  getVocabularyByTopic,
} from "../controllers/vocabularyController.js";

const router = Router();

router.get("/", getAllVocabulary);
router.get("/level/:level", getVocabularyByLevel);
router.get("/topic/:topic", getVocabularyByTopic);

export default router;
