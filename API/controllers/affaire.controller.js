import Affaire from "../models/affaire.model.js";
import BlocAffaire from "../models/blocAffaire.model.js";
import LigneMo from "../models/ligneMo.model.js";

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

  //get all ligne MO de l'affaire uniquement 
  export const getLignesMoByAffaire = async (req, res, next) => {
    try {
      const affaire = await Affaire.findById(req.params.id);
  
      let allLignesMo = [];
  
      for (let blocId of affaire.idBlocAffaire) {
        const bloc = await BlocAffaire.findById(blocId);
        const lignesMo = await Promise.all(
          bloc.idLigneMo.map(async (ligneId) => {
            return await LigneMo.findById(ligneId);
          })
        );
        allLignesMo = allLignesMo.concat(lignesMo);
      }
  
      res.status(200).json(allLignesMo);
    } catch (err) {
      next(err);
    }
  };

  //Get progress affaire LigneMo


// get total progress of an Affaire
export const getAffaireProgress = async (req, res, next) => {
  try {
    const affaireId = req.params.id;
    const affaire = await Affaire.findById(affaireId);
    if (!affaire) {
      return res.status(404).json({ message: "Affaire introuvable" });
    }
    
    let totalDuration = 0;
    let completedDuration = 0;

    // Loop over each BlocAffaire in the Affaire
    for (const blocAffaireId of affaire.idBlocAffaire) {
      const blocAffaire = await BlocAffaire.findById(blocAffaireId);

      // Loop over each LigneMo in the BlocAffaire
      for (const ligneMoId of blocAffaire.idLigneMo) {
        const ligneMo = await LigneMo.findById(ligneMoId);

        // Add to the total duration
        totalDuration += ligneMo.duration;

        // Add to the completed duration based on progress
        completedDuration += ligneMo.duration * (ligneMo.progress / 100);
      }
    }

    // Calculate the total progress
    const totalProgress = completedDuration / totalDuration * 100;

    // Calculate the remaining progress
    const remainingProgress = 100 - totalProgress;

    res.status(200).json({
      totalProgress: totalProgress,
      remainingProgress: remainingProgress
    });
  } catch (err) {
    next(err);
  }
};
  