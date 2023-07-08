import Conversation from"../models/conversation.model.js";
import Message from "../models/message.model.js";

export const creatMessage = async (req, res, next) => {
    const conversationId = req.params.conversationId;
    const newMessage = new Message(req.body);
  
    try {
      // Vérifier si l'ID du bloc Affaire est valide
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation introuvable" });
      }
  
      const saveMessage = await newMessage.save();
      try {
        await Conversation.findByIdAndUpdate(conversationId, {
          $push: { idmessages: saveMessage._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(saveMessage);
    } catch (err) {
      next(err);
    }
  };