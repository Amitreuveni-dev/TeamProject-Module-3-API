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

quizzesRouter.get("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

quizzesRouter.get("/api/quizzes?tag=math&sort=rating", (req, res) => {

});

quizzesRouter.post("/api/quizzes/:id/submit", (req, res) => {
    const { id } = req.params;

});


quizzesRouter.post("/api/quizzes", async (req, res) => {
    try {
        const { quizName, category, userId, questions } = req.body;

        if (!quizName || !category || !userId || !questions || !Array.isArray(questions)) {
            res.status(400).json({ message: "Invalid input. Please provide all required fields." });
            return;
        }

        for (const question of questions) {
            if (!question.questionText || !question.options || !question.correctAnswer) {
                res.status(400).json({ message: "Each question must have a questionText, options, and correctAnswer." });
                return;
            }
        }

        const newQuiz = new Quiz({
            quizName,
            category,
            userId,
            questions,
        });

        const savedQuiz = await newQuiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz: savedQuiz });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create quiz" });
    }
});


quizzesRouter.delete("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

