import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
    quizId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, { timestamps: true });

export const Rating = model("Rating", ratingSchema);
