import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
}, { timestamps: true });

export const Question = model("Question", questionSchema);
