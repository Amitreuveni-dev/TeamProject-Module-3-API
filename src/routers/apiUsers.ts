import express from "express";
import { User } from "../models/user.model";
import { authenticate } from "../middlewares/authenticate";

export const userRouter = express.Router();


userRouter.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

});
userRouter.get("/api/users/:id/quizzes", (req, res) => {
  const { id } = req.params;

});
userRouter.get("/api/users/:id/scores", (req, res) => {
  const { id } = req.params;

});