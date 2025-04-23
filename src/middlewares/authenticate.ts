import { Handler } from "express";

export const authenticate: Handler = (req, res, next) => {

  const userId = req.signedCookies.userId;

  if (!userId) {
    res.status(401);
    res.end();
    return;
  }

  req.user = { id: userId };
  next();
};