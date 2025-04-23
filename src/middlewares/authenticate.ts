import { Handler } from "express";

export const authenticate: Handler = (req, res, next) => {
  console.log("Signed cookies:", req.signedCookies);
  console.log("Unsigned cookies:", req.cookies);
  console.log("Authenticated request from:", req.user);

  const userId = req.signedCookies.userId;

  if (!userId) {
    res.status(401).end();
    return;
  }

  req.user = { id: userId };
  next();
};