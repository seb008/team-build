import Affaire from "../models/affaire.model.js";
import BlocAffaire from "../models/blocAffaire.model.js";

//creat affaire

export const creatAffaire = async (req, res) => {
    const newAffaire = new Affaire(req.body);
    try {
        const savedAffaire = await newAffaire.save();
        res.status(200).json(savedAffaire);
    } catch (err) {
        res.status(500).json(err);
    }
}

//update affaire 

export const updateAffaire = async (req, res, next) => {
    try {
        const updateAffaire = await Affaire.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateAffaire);
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete affaire 
export const deleteAffaire = async (req, res, next) => {

    try {
        await Affaire.findByIdAndDelete(req.params.id);
        res.status(200).json("Affaire deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}

//get affaire 

export const getAffaire = async (req, res, next) => {

    try {
        const affaire = await Affaire.findById(req.params.id);
        res.status(200).json(affaire);

    } catch (err) {
        res.status(500).json(err);
    }
}

//get all affaire 

export const getAllAffaire = async (req, res, next) => {

    try {
        const affaires = await Affaire.find();
        res.status(200).json(affaires);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get bloc affaire
export const getBlocAffaireAffaire = async (req, res, next) => {
    try {
      const affaire = await Affaire.findById(req.params.id);
      const list = await Promise.all(
        affaire.idBlocAffaire.map(async (bloc) => {
          return await BlocAffaire.findById(bloc);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };