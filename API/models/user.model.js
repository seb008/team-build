import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,
        },
        firstname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        img: {
            type: [String],
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            defaut: false,
        },
    },
    { timestamps: true }
);
export default mongoose.model("User", UserSchema);