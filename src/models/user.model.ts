import { Schema, model } from "mongoose";

const userSchema = new Schema({
    _id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confrimPassword: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const User = model("User", userSchema);
