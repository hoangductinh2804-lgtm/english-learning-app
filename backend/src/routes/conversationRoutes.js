import { Router } from "express";
import { getConversations, getConversationById } from "../controllers/conversationController.js";

const router = Router();

router.get("/", getConversations);
router.get("/:id", getConversationById);

export default router;
