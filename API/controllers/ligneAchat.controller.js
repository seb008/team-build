import BlocAffaire from "../models/blocAffaire.model.js";
import LigneAchat from "../models/ligneAchat.model.js";

//creer ligne Achat

export const creatLigneAchat = async (req, res, next) => {
  const blocAffaireId = req.params.blocAffaireId;
  const newLigneAchat = new LigneAchat(req.body);

  try {
    // Vérifier si l'ID du bloc Affaire est valide
    const blocaffaire = await BlocAffaire.findById(blocAffaireId);
    if (!blocaffaire) {
      return res.status(404).json({ message: "Bloc Affaire introuvable" });
    }

    const saveLigne = await newLigneAchat.save();
    try {
      await BlocAffaire.findByIdAndUpdate(blocAffaireId, {
        $push: { idLigneAchat: saveLigne._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveLigne);
  } catch (err) {
    next(err);
  }
};

//Update ligne Achat
export const updateLigneAchat = async (req,res,next) =>{
    try {
        console.log('Uploded file: ', req.file);
        const updateLigneAchat = await LigneAchat.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateLigneAchat);
      } catch (err) {
        next(err);
      }
    };

    // Delete ligne Achat
export const deleteLigneAchat = async(req,res,next)=>{
    const blocAffaireId = req.params.blocAffaireId;

    try {
      await LigneAchat.findByIdAndDelete(req.params.id);
      try {
        await BlocAffaire.findByIdAndUpdate(blocAffaireId, {
          $pull: { idLigneAchat: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Ligne Achat Supprimé");
    } catch (err) {
      next(err);
    }
  };

  //Get ligne Achat
export const getLigneAchat = async (req, res, next) => {
    try {
      const ligneAchat = await LigneAchat.findById(req.params.id);
      res.status(200).json(ligneAchat);
    } catch (err) {
      next(err);
    }
  };
  
  //Get All ligne Achat
  
  export const getAllLigneAchat = async (req, res, next) => {
    try {
      const lignesAchat = await LigneAchat.find();
      res.status(200).json(lignesAchat);
    } catch (err) {
      next(err);
    }
  };
  