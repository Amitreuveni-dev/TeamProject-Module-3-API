import express from "express";
import { userRouter } from "./apiUsers";
import { quizzesRouter } from "./apiQuizzes";
import { scoresRouter } from "./apiScore";
import { ratingRouter } from "./apiRating";

export const router = express.Router();

router.get("/hello", (_, res) => {
    res.json({ message: "Hello World!" });
});

