import express from "express";
import {
  creatBlocAffaire,
  deleteBlocAffaire,
  getAllBlocAffaire,
  getBlocAffaire,
  getLignesAchatMo,
  updateBlocAffaire,
} from "../controllers/blocAffaire.controller.js";

const router = express.Router();

//creer bloc Affaire
router.post("/:affaireId", creatBlocAffaire);

//Update bloc Affaire
router.put("/:id", updateBlocAffaire);

// Delete bloc Affaire
router.delete("/:id/:affaireId", deleteBlocAffaire);

// Get
router.get("/:id", getBlocAffaire);

//Get All bloc Affaire
router.get("/", getAllBlocAffaire);

//Get Lignes
router.get("/lignes/:id", getLignesAchatMo);

export default router;
