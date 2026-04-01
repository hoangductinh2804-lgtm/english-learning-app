import { Router } from "express";
import { getCategories, getFlashcardsByCategory } from "../controllers/flashcardController.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:categoryId/cards", getFlashcardsByCategory);

export default router;
