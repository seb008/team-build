import mongoose from "mongoose";

const JustifLigneAchatSchema = new mongoose.Schema(
  {
    titleJustif: {
      type: String,
      require: true,
    },
    path: {
      type: String,
    },

    check: {
      type: Boolean,
      defaut: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JustifLigneAchat", JustifLigneAchatSchema);
