import express from "express";

export const quizzesRouter = express.Router();


quizzesRouter.get("/api/quizzes", (req, res) => {

});

quizzesRouter.get("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

quizzesRouter.get("/api/quizzes?tag=math&sort=rating", (req, res) => {

});

quizzesRouter.post("/api/quizzes/:id/submit", (req, res) => {

});


quizzesRouter.post("/api/quizzes", (req, res) => {

});


quizzesRouter.delete("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

