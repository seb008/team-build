import  express  from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

//Update User
router.put("/:id", updateUser);

//Delete User
router.delete("/:id", deleteUser);

//Get User 
router.get("/:id", getUser);

//Get All Users
router.get("/",getAllUsers);

export default router