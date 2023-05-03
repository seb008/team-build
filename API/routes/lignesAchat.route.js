import express from "express";
import {
  creatLigneAchat,
  deleteLigneAchat,
  getAllLigneAchat,
  getLigneAchat,
  updateLigneAchat,
} from "../controllers/ligneAchat.controller.js";

const router = express.Router();

//creer ligne Achat
router.post("/:blocAffaireId", creatLigneAchat);

//Update ligne Achat
router.put("/:id", updateLigneAchat);

// Delete ligne Achat
router.delete("/:id/:blocAffaireId", deleteLigneAchat);

// Get
router.get("/:id", getLigneAchat);

//Get All ligne Achat
router.get("/", getAllLigneAchat);

export default router;
