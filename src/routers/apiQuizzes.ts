import express from "express";
import { Quiz } from "../models/quiz.model";

export const quizzesRouter = express.Router();

quizzesRouter.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find().select("quizName category rating");
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch quizzes" });
    }
});

quizzesRouter.get("/api/quizzes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch quiz" });
    }
});

quizzesRouter.get("/api/quizzes/filter/search", async (req, res) => {
    const { tag, sort } = req.query;
    try {
        let query = tag ? { category: tag } : {};
        let quizzes = await Quiz.find(query);
        if (sort === "rating") {
            quizzes = quizzes.sort((a, b) => b.rating - a.rating);
        }
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Failed to filter quizzes" });
    }
});

quizzesRouter.post("/api/quizzes/:id/submit", async (req, res) => {
    const { id } = req.params;
    const { answers } = req.body;
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        let score = 0;
        quiz.questions.forEach((q, i) => {
            if (q.correctAnswer === answers[i]) {
                score++;
            }
        });
        res.json({ score, total: quiz.questions.length });
    } catch (err) {
        res.status(500).json({ message: "Failed to submit quiz" });
    }
});

quizzesRouter.post("/api/quizzes", async (req, res) => {
    try {
        const { quizName, category, userId, questions } = req.body;
        if (!quizName || !category || !userId || !questions || !Array.isArray(questions)) {
            res.status(400).json({ message: "Invalid input. Please provide all required fields." });
            return;
        }
        for (const question of questions) {
            if (!question.questionText || !question.options || question.correctAnswer == null) {
                res.status(400).json({ message: "Each question must have a questionText, options, and correctAnswer." });
                return;
            }
        }
        const newQuiz = new Quiz({ quizName, category, userId, questions });
        const savedQuiz = await newQuiz.save();
        res.status(201).json({ message: "Quiz created successfully", quiz: savedQuiz });
    } catch (err) {
        res.status(500).json({ message: "Failed to create quiz" });
    }
});

quizzesRouter.delete("/api/quizzes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Quiz.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete quiz" });
    }
});
