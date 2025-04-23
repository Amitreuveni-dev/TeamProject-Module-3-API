import express from "express";
import { Rating } from "../models/rating.model";
import { authenticate } from "../middlewares/authenticate";

export const ratingRouter = express.Router();

ratingRouter.get("/api/ratings/:quizId", async (req, res) => {
    const { quizId } = req.params;

    try {
        const ratings = await Rating.find({ quizId });
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch ratings" });
    }
});

ratingRouter.post("/api/ratings/:quizId", authenticate, async (req, res) => {
    const { quizId } = req.params;
    const { score } = req.body;

    if (typeof score !== "number" || score < 1 || score > 5) {
        res.status(400).json({ message: "Score must be a number between 1 and 5" });
        return;
    }

    try {
        const newRating = await Rating.create({
            quizId,
            userId: (req.user as any)._id,
            score,
        });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: "Failed to post rating" });
    }
});
