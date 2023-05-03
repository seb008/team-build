import express from "express";
import {
  creatLigneMo,
  deleteLigneMo,
  getAllLigneMo,
  getLigneMo,
  updateLigneMo,
} from "../controllers/ligneMo.controller.js";

const router = express.Router();

//creer ligne Achat
router.post("/:blocAffaireId", creatLigneMo);

//Update ligne Mo
router.put("/:id", updateLigneMo);

// Delete ligne Mo
router.delete("/:id/:blocAffaireId", deleteLigneMo);

// Get
router.get("/:id", getLigneMo);

//Get All ligne Mo
router.get("/", getAllLigneMo);

export default router;
