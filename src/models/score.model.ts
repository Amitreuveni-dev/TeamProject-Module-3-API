import { Schema, model, Types } from "mongoose";

const scoreSchema = new Schema(
  {
    quizId: {
      type: Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Score = model("Score", scoreSchema);
