import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
}, { timestamps: true });

export const Rating = model("Rating", ratingSchema);
