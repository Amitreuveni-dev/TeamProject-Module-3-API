import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./routers/api";
import { authenticate } from "./middlewares/authenticate";
import { User } from "./models/user.model";

export const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});


app.use(json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.post("/register", async (req, res) => {

    try {
        const { email, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        const user = await User.create({
            email,
            username,
            password,
        });


        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("userId", user._id, {
            expires,
            signed: true,
            httpOnly: true,
        });

        res.status(201);
        res.end();
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
});


app.post("/logOut", (req, res) => {
    res.clearCookie("userId");
    res.json({ message: "You have logged out" })
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        res.cookie("userId", user._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/me", authenticate, async (req, res) => {
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

app.use("/api", apiRouter);
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use((_, res) => {
    res.status(404).sendFile(path.resolve(__dirname, "..", "public", "404.html"));
});
