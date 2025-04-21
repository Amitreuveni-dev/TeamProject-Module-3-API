import express from "express";
import { User } from "../models/user.model";
import cookieParser from "cookie-parser";
import { authenticate } from "../middlewares/authenticate";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}

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



userRouter.post("/api/auth/register", async (req, res) => {
    const {email, username, password, confrimPassword} = req.body;
  try {
    if(password !== confrimPassword) {

    }
  } catch {

  }
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
      

userRouter.get("/api/auth/me", authenticate, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user?.id).select("-password");

    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(foundUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
