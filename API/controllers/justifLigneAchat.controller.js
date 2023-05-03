import LigneAchat from "../models/ligneAchat.model.js";
import JustifLigneAchat from "../models/JustifLigneAchat.model.js";

//creer Justif ligne Achat

export const creatJustifLigneAchat = async (req, res, next) => {
  const ligneAchatId = req.params.ligneAchatId;
  const newJustifLigneAchat = new JustifLigneAchat(req.body);

  try {
    // Vérifier si l'ID du bloc Affaire est valide
    const ligneAchat = await LigneAchat.findById(ligneAchatId);
    if (!ligneAchat) {
      return res.status(404).json({ message: "Ligne Achat Affaire introuvable" });
    }

    const saveJustif = await newJustifLigneAchat.save();
    try {
      await LigneAchat.findByIdAndUpdate(ligneAffaireId, {
        $push: { idJustify: saveJustif._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveJustif);
  } catch (err) {
    next(err);
  }
};

//Update Justif ligne Achat
export const updateJustifLigneAchat = async (req,res,next) =>{
    try {
        const updateJustifLigneAchat = await JustifLigneAchat.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateJustifLigneAchat);
      } catch (err) {
        next(err);
      }
    };

    // Delete Justif ligne Achat
export const deleteJustifLigneAchat = async(req,res,next)=>{
    const ligneAchatId = req.params.ligneAchatId;

    try {
      await JustifLigneAchat.findByIdAndDelete(req.params.id);
      try {
        await LigneAchat.findByIdAndUpdate(ligneAchatId, {
          $pull: { idJustify: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Justif Ligne Achat Supprimé");
    } catch (err) {
      next(err);
    }
  };

  //Get Justif ligne Achat
export const getJustifLigneAchat = async (req, res, next) => {
    try {
      const justifLigneAchat = await JustifLigneAchat.findById(req.params.id);
      res.status(200).json(justifLigneAchat);
    } catch (err) {
      next(err);
    }
  };
  
  //Get All Justif ligne Achat
  
  export const getAllJustifLigneAchat = async (req, res, next) => {
    try {
      const justifLignesAchat = await JustifLigneAchat.find();
      res.status(200).json(justifLignesAchat);
    } catch (err) {
      next(err);
    }
  };