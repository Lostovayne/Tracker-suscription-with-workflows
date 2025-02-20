import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET!);
    const user = await User.findById((decodedToken as jwt.JwtPayload).id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
};

export default authorize;
