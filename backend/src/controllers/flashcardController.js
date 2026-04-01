import { flashcardCategories, flashcards } from "../data/flashcardData.js";

export async function getCategories(_req, res) {
  return res.status(200).json({ count: flashcardCategories.length, categories: flashcardCategories });
}

export async function getFlashcardsByCategory(req, res) {
  const { categoryId } = req.params;
  const category = flashcardCategories.find((c) => c.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const cards = flashcards.filter((card) => card.categoryId === categoryId);
  return res.status(200).json({ category, count: cards.length, cards });
}
