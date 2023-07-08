import express from "express";
import {
  creatAffaire,
  deleteAffaire,
  getAffaire,
  getAffaireProgress,
  getAllAffaire,
  getBlocAffaireAffaire,
  getLignesMoByAffaire,
  updateAffaire,
} from "../controllers/affaire.controller.js";
import Affaire from "../models/affaire.model.js";

const router = express.Router();

// creat affaire
router.post("/", creatAffaire);

//update affaire
router.put("/:id", updateAffaire);

//delete affaire
router.delete("/:id", deleteAffaire);

//get affaire
router.get("/:id", getAffaire);

//get all affaires
router.get("/", getAllAffaire);

//get all bloc / affaire
router.get("/bloc/:id",getBlocAffaireAffaire);

//get all ligne MO de l'affaire uniquement 
router.get("/:id/lignesMo", getLignesMoByAffaire);

//Get Progress LigneMo
router.get("/progress/:id", getAffaireProgress);

export default router;
