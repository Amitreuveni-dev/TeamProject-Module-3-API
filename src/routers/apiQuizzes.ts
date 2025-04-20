import express from "express";

const router = express.Router();


router.get("/api/quizzes", (req, res) => {

});

router.get("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

router.get("/api/quizzes?tag=math&sort=rating", (req, res) => {

});

router.post("/api/quizzes/:id/submit", (req, res) => {

});


router.post("/api/quizzes", (req, res) => {

});


router.delete("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
});

