import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET!);
    const user = await User.findById((decodedToken as jwt.JwtPayload).id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default authorize;
