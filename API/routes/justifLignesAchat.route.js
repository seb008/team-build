import express from "express";
import {
  creatJustifLigneAchat,
  deleteJustifLigneAchat,
  getAllJustifLigneAchat,
  getJustifLigneAchat,
  updateJustifLigneAchat,
} from "../controllers/justifLigneAchat.controller.js";

const router = express.Router();

//creer Justif
router.post("/:ligneAchatId", creatJustifLigneAchat);

//Update Justif
router.put("/:id", updateJustifLigneAchat);

// Delete Justif
router.delete("/:id/:ligneAchatId", deleteJustifLigneAchat);

// Get
router.get("/:id", getJustifLigneAchat);

//Get All Justif
router.get("/", getAllJustifLigneAchat);

export default router;
