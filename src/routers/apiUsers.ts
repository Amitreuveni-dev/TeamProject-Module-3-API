import express from "express";

export const userRouter = express.Router();


userRouter.get("/api/users:id", (req, res) => {

});
userRouter.get("/api/users:id/quizzes", (req, res) => {

});
userRouter.get("/api/users:id/scores", (req, res) => {

});



userRouter.post("/api/auth/register", (req, res) => {
    
});

userRouter.post("/api/auth/login", (req, res) => {
    
});

userRouter.get("/api/auth/me", (req, res) => {

});