import { Router } from "express";
import {
  getAllGrammarLessons,
  getGrammarLessonByTense,
  getGrammarQuizByTense,
} from "../controllers/grammarController.js";

const router = Router();

router.get("/", getAllGrammarLessons);
router.get("/tense/:tense", getGrammarLessonByTense);
router.get("/tense/:tense/quiz", getGrammarQuizByTense);

export default router;