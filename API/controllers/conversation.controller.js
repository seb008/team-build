import Affaire from "../models/affaire.model.js";
import Conversation from "../models/conversation.model.js"

export const creatConversation = async (req, res, next) => {

  const affaireId = req.params.affaireId;
  const newConversation = new Conversation(req.body);

  try {
    const affaire = await Affaire.findById(affaireId);
    if (!affaire) {
      return res.status(404).json({ message: "Affaire introuvable" });
    }
    const saveConverse = await newConversation.save();
    try {
      await Affaire.findByIdAndUpdate(affaireId, {
        $push: { conversation: saveConverse._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveConverse);
  } catch (err) {
    next(err);
  }
};


// Update Conversation
export const updateConversation = async (req, res, next) => {
    try {
      const updateConversation = await Conversation.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateConversation);
    } catch (err) {
      next(err);
    }
  };

//Get Conversation
export const getConversation = async (req, res, next) => {
  try {
    const convesration = await Conversation.findById(req.params.id);
    res.status(200).json(convesration);
  } catch (err) {
    next(err);
  }
};

