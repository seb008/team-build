import mongoose from 'mongoose';
import LigneMo from "./ligneMo.model.js";
import BlocAffaire from "./blocAffaire.model.js"; 

const AffaireSchema = new mongoose.Schema({
    idUser: {
        type: [String],
    },
    files :{
        type: [String],
    },
    name: {
        type: String,
        require: true,
    },
    adress: {
        type: String,
        require: true,
    },
    montantTotal: {
        type: Number,
        require: true,
    },
    refAffaire: {
        type: String,
    },
    description: {
        type: String,
    },
    idBlocAffaire: {
        type: [String],
    },
    idBlocChantier: {
        type: [String],
    },
    etatAffaireLigneAchat: {
        type: String,
        enum: ["a compléter", "prête a éxé", "terminé"],
        default: "a compléter",
    },
    etatAffaireLigneMo: {
        type: String,
        enum: ["non commencé", "en cours d'execution", "terminé"],
        default: "non commencé",
    },
    conversation:{
        type: [String],
    },

},
{ timestamps: true }
);

//modif  etatAffaireLigneMo 
AffaireSchema.methods.calculateProgress = async function () {
    let totalDuration = 0;
    let completedDuration = 0;
  
    for (const blocAffaireId of this.idBlocAffaire) {
      const blocAffaire = await BlocAffaire.findById(blocAffaireId);
      for (const ligneMoId of blocAffaire.idLigneMo) {
        const ligneMo = await LigneMo.findById(ligneMoId);
        totalDuration += ligneMo.duration;
        completedDuration += ligneMo.duration * (ligneMo.progress / 100);
      }
    }
  
    const totalProgress = completedDuration / totalDuration * 100;
    return totalProgress;
  };

  AffaireSchema.methods.calculateState = async function () {
    let allCompleted = true;
    let atLeastOneInProgress = false;
  
    for (const blocAffaireId of this.idBlocAffaire) {
      const blocAffaire = await BlocAffaire.findById(blocAffaireId);
      for (const ligneMoId of blocAffaire.idLigneMo) {
        const ligneMo = await LigneMo.findById(ligneMoId);
        if (ligneMo.etatLigneMo !== "terminé") {
          allCompleted = false;
        }
        if (ligneMo.etatLigneMo === "en cour de réalisation") {
          atLeastOneInProgress = true;
        }
      }
    }
  
    // Si aucune ligne Mo n'existe, l'état de l'affaire est "non commencé"
    if (this.idBlocAffaire.length === 0) {
      return "non commencé";
    } else if (allCompleted) {
      return "terminé";
    } else if (atLeastOneInProgress) {
      return "en cours d'execution";
    } else {
      return "non commencé";
    }
  };
  
  
export default mongoose.model("Affaire",AffaireSchema)