import Affaire from "../models/affaire.model.js";
import BlocAffaire from "../models/blocAffaire.model.js";

//creer bloc Affaire

export const creatBlocAffaire = async (req, res, next) => {
  const affaireId = req.params.affaireId;
  const newBlocAffaire = new BlocAffaire(req.body);

  try {
    // Vérifier si l'ID de l'affaire est valide
    const affaire = await Affaire.findById(affaireId);
    if (!affaire) {
      return res.status(404).json({ message: "Affaire introuvable" });
    }

    const saveBloc = await newBlocAffaire.save();
    try {
      await Affaire.findByIdAndUpdate(affaireId, {
        $push: { idBlocAffaire: saveBloc._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveBloc);
  } catch (err) {
    next(err);
  }
};

// Update bloc Affaire
export const updateBlocAffaire = async (req, res, next) => {
  try {
    const updateBlocAffaire = await BlocAffaire.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateBlocAffaire);
  } catch (err) {
    next(err);
  }
};

// Delete bloc Affaire
export const deleteBlocAffaire = async (req, res, next) => {
  const affaireId = req.params.affaireId;

  try {
    await BlocAffaire.findByIdAndDelete(req.params.id);
    try {
      await Affaire.findByIdAndUpdate(affaireId, {
        $pull: { idBlocAffaire: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Bloc Supprimé");
  } catch (err) {
    next(err);
  }
};

//Get bloc Affaire
export const getBlocAffaire = async (req, res, next) => {
  try {
    const blocAffaire = await BlocAffaire.findById(req.params.id);
    res.status(200).json(blocAffaire);
  } catch (err) {
    next(err);
  }
};

//Get All bloc Affaire

export const getAllBlocAffaire = async (req, res, next) => {
  try {
    const blocsAffaire = await BlocAffaire.find();
    res.status(200).json(blocsAffaire);
  } catch (err) {
    next(err);
  }
};
