import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { seedVocabularyData } from "../data/seedVocabularyData.js";
import { Vocabulary } from "../models/Vocabulary.js";

dotenv.config();

async function seedVocabulary() {
  try {
    await connectDB();

    await Vocabulary.deleteMany({});
    await Vocabulary.insertMany(seedVocabularyData);

    console.log(`Seeded ${seedVocabularyData.length} vocabulary items`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed vocabulary:", error.message);
    process.exit(1);
  }
}

seedVocabulary();
