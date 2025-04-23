import express from "express";
import { Score } from "../models/score.model";

export const scoresRouter = express.Router();

scoresRouter.get("/api/scores/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const scores = await Score.find({ quizId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

scoresRouter.get("/api/scores/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userScores = await Score.find({ userId }).sort({ createdAt: -1 });
    res.json(userScores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

scoresRouter.get("/api/stats", async (req, res) => {
  try {
    const totalScores = await Score.countDocuments();
    const averageScore = await Score.aggregate([
      { $group: { _id: null, avg: { $avg: "$score" } } },
    ]);
    res.json({
      totalScores,
      averageScore: averageScore[0]?.avg ?? 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

scoresRouter.post("/api/scores", async (req, res) => {
  const { quizId, userId, score } = req.body;

  if (!quizId || !userId || score == null) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const newScore = await Score.create({ quizId, userId, score });
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
