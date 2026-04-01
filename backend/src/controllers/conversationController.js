import { conversations } from "../data/conversationData.js";

export async function getConversations(_req, res) {
  return res.status(200).json({ count: conversations.length, conversations });
}

export async function getConversationById(req, res) {
  const { id } = req.params;
  const conversation = conversations.find((c) => c.id === id);

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  return res.status(200).json({ conversation });
}
