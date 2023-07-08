import express from "express";
import { creatConversation, getConversation, updateConversation } from "../controllers/conversation.controller.js";

const router = express.Router();

//Creer Conversation dans une affaire 
router.post("/:affaireId", creatConversation);

// update Conversation
router.put("/:id", updateConversation);

// Get
router.get("/:id", getConversation);

export default router;