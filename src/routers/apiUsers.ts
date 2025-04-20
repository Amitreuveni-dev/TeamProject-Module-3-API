import express from "express";
import { User } from "../models/user.model";

export const userRouter = express.Router();


userRouter.get("/api/users:id", (req, res) => {

});
userRouter.get("/api/users:id/quizzes", (req, res) => {

});
userRouter.get("/api/users:id/scores", (req, res) => {

});



userRouter.post("/api/auth/register", (req, res) => {
    
});

userRouter.post("/api/auth/logOut", (req, res) => {
    res.clearCookie("userId");
    res.json({ message: "You have logged out"})
});

userRouter.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    try {

      if (!user?.password || password) {
        res.status(401).json({ message: "Invalid credentials" });
        return;

    }
    

    } catch {
        res.cookie("userId", user?._id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

    }


  res.json({ message: "Logged in"});
});
      

userRouter.get("/api/auth/me", (req, res) => {

});