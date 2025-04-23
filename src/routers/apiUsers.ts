import express from "express";
import { User } from "../models/user.model";
import { Quiz } from "../models/quiz.model";
import { Score } from "../models/score.model";

export const userRouter = express.Router();

userRouter.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
    return;
  }
});

userRouter.get("/api/users/:id/quizzes", async (req, res) => {
  const { id } = req.params;
  
  try {
    const quizzes = await Quiz.find({ creator: id });
    if (quizzes.length === 0) {
      res.status(404).json({ message: "No quizzes found for this user" });
      return;
    }
    res.json(quizzes);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quizzes", error });
    return;
  }
});

userRouter.get("/api/users/:id/scores", async (req, res) => {
  const { id } = req.params;
  
  try {
    const scores = await Score.find({ userId: id });
    if (scores.length === 0) {
      res.status(404).json({ message: "No scores found for this user" });
      return;
    }
    res.json(scores);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error retrieving scores", error });
    return;
  }
});
