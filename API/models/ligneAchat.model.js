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
    statusLigneAchat: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model ("LigneAchat", LigneAchatSchema);
