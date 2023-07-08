import mongoose from "mongoose";
import Affaire from "./affaire.model.js"

const LigneMoSchema = new mongoose.Schema(
  {
    titleLigneMo: {
      type: String,
      require: true,
    },
    montantLigneMo: {
      type: Number,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    workersNeed: {
      type: Number,
      require: true,
    },
    workersId: {
      type: [String],
    },
    dateStart:{
      type: Date,
      default: null
    },
    etatLigneMo: {
      type: String,
      enum: ["a faire", "en cour de réalisation", "terminé"],
      default: "a faire",
    },
    progress: {
      type: Number,
      min:[0],
      max:[100],
      default:0,
    },
    affaireId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Affaire"
    },
  },
  { timestamps: true }
);

LigneMoSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getFilter());
  
  if (!docToUpdate) {
    console.log("Erreur: document LigneMo non trouvé pour la mise à jour");
    return next();
  }
  
  if (docToUpdate.progress >= 100) {
    this._update.etatLigneMo = "terminé";
  } else if (docToUpdate.progress > 0) {
    this._update.etatLigneMo = "en cour de réalisation";
  } else {
    this._update.etatLigneMo = "a faire";
  }

  
  next();
});



export default mongoose.model("LigneMo", LigneMoSchema);
