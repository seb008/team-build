import BlocAffaire from "../models/blocAffaire.model.js";
import LigneMo from "../models/ligneMo.model.js";

//creer ligne Mo

export const creatLigneMo = async (req, res, next) => {
  const blocAffaireId = req.params.blocAffaireId;
  const newLigneMo = new LigneMo(req.body);

  try {
    // Vérifier si l'ID du bloc Affaire est valide
    const blocaffaire = await BlocAffaire.findById(blocAffaireId);
    if (!blocaffaire) {
      return res.status(404).json({ message: "Bloc Affaire introuvable" });
    }

    const saveLigne = await newLigneMo.save();
    try {
      await BlocAffaire.findByIdAndUpdate(blocAffaireId, {
        $push: { idLigneMo: saveLigne._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveLigne);
  } catch (err) {
    next(err);
  }
};

//Update ligne Mo
export const updateLigneMo = async (req, res, next) => {
  try {
    const updateLigneMo = await LigneMo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateLigneMo);
  } catch (err) {
    next(err);
  }
};

// Delete ligne Mo
export const deleteLigneMo = async (req, res, next) => {
  const blocAffaireId = req.params.blocAffaireId;

  try {
    await LigneMo.findByIdAndDelete(req.params.id);
    try {
      await BlocAffaire.findByIdAndUpdate(blocAffaireId, {
        $pull: { idLigneMo: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Ligne MO Supprimé");
  } catch (err) {
    next(err);
  }
};

//Get ligne Mo
export const getLigneMo = async (req, res, next) => {
  try {
    const ligneMo = await LigneMo.findById(req.params.id);
    res.status(200).json(ligneMo);
  } catch (err) {
    next(err);
  }
};

//Get All ligne Mo

export const getAllLigneMo = async (req, res, next) => {
  try {
    const lignesMo = await LigneMo.find();
    res.status(200).json(lignesMo);
  } catch (err) {
    next(err);
  }
};
