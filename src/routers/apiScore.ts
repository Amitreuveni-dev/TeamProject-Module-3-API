import express from "express";

export const scoresRouter = express.Router();

scoresRouter.get("/api/scores/:quizId", (req, res) => {
    const { quizId } = req.params;

});

scoresRouter.get("/api/scores/user/:userId", (req, res) => {
    const { userId } = req.params; 

});

scoresRouter.get("/api/stats", (req, res) => {

});

scoresRouter.post("/api/scores", (req, res) => {

});