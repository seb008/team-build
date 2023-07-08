import mongoose from "mongoose";

const LigneAchatSchema = new mongoose.Schema(
  {
    titleLigneAchat: {
      type: String,
      require: true,
    },
    montantLigneAchat: {
      type: Number,
      require: true,
    },
    idJustify: {
      type: [String],
    },
    etatLigneAchat: {
      type: String,
      enum: ["a compléter", "prête a recupérer chez fournisseur", "prête a recupérer au dépot","prête livraison sur chantier"],
      default: "a compléter",
    },
    dateLivraison:{
      type: Date,
      default: null
    },
  },
  { timestamps: true }
);

export default mongoose.model("LigneAchat", LigneAchatSchema);
