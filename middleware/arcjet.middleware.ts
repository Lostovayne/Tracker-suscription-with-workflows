import type { NextFunction, Request, Response } from "express";
import aj from "../config/arcjet";

const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate Limit Exceeded" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot Detected" });
      }
      if (decision.reason.isSensitiveInfo()) {
        return res.status(403).json({ message: "Sensitive Info Detected" });
      }
      if (decision.reason.isEmail()) {
        return res.status(403).json({ message: "Email Detected" });
      }
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error : ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
