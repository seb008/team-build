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

    },
    workersNeed: {
      type: Number,
     
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




export default mongoose.model("LigneMo", LigneMoSchema);
