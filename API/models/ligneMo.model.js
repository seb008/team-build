import mongoose from "mongoose";

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
    statusLigneAchat: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LigneMo", LigneMoSchema);
