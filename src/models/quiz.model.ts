import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    quizName: {
        type: String,
        required: true,
    },
    category: {
        type : String,
        required: true,
    },
    quizId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Quiz = model("Quiz", quizSchema);
