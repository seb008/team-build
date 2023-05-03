import express from "express";
import {
  creatAffaire,
  deleteAffaire,
  getAffaire,
  getAllAffaire,
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

export default router;
