import { Handler } from "express";

export const authenticate: Handler = (req, res, next) => {
    const userId = req.signedCookies.userId;
  
    if (!userId) {
      res.status(401).end();
      return;
    }
  
    (req as any).user = { id: userId };
    next();
  };