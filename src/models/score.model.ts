import { Schema, model } from "mongoose";

const scoreSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
}, { timestamps: true });

export const Score = model("Score", scoreSchema);
