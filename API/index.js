import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/users.route.js"
import affairesRoute from "./routes/affaires.route.js"
import blocAffairesRoute from "./routes/blocAffaires.route.js"
import lignesAchatRoute from "./routes/lignesAchat.route.js"
import justifLignesAchatRoute from "./routes/justifLignesAchat.route.js"
import lignesMoRoute from "./routes/lignesMo.route.js"
import blocChantiersRoute from "./routes/blocChantiers.route.js"
import conversationsRoute from "./routes/conversation.route.js"
import messagesRoute from "./routes/messages.route.js"


import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected at mongoDB")
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/affaires", affairesRoute);
app.use("/api/blocAffaires", blocAffairesRoute);
app.use("/api/lignesAchat", lignesAchatRoute);
app.use("/api/justifLignesAchat", justifLignesAchatRoute);
app.use("/api/lignesMo", lignesMoRoute);
app.use("/api/blocChantiers", blocChantiersRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "error middleware";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


const port = process.env.PORT
app.listen(port, () => {
  connect()
  console.log("connecter au serveur au port ", port);
});
