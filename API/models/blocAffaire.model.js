import mongoose from "mongoose";

const BlocAffaireSchema = new mongoose.Schema(
  {
    titleBloc: {
      type: String,
      require: true,
    },
    montantTotal: {
      type: Number,
      require: false
    },
    idLigneMo: {
      type: [String],
    },
    idLigneAchat: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BlocAffaire", BlocAffaireSchema);
