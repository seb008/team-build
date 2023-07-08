import express from "express";
import { creatMessage } from "../controllers/message.controller.js";

const router = express.Router();

//creer Message

router.post("/:conversationId", creatMessage);

export default router;