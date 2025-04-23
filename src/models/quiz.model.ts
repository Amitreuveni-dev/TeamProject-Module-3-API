import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    quizName: {
        type: String,
        required: true,
    },
    category: {
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
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
        },
    ],
}, { timestamps: true });

export const Quiz = model("Quiz", quizSchema);