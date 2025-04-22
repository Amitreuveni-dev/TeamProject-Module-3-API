import express from "express";
import { userRouter } from "./apiUsers";
import { quizzesRouter } from "./apiQuizzes";
import { scoresRouter } from "./apiScore";
import { ratingRouter } from "./apiRating";

export const router = express.Router();

router.use(userRouter);

