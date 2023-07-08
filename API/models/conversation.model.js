import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    idcreat: {
      type: String,
    },
    idmessages: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
