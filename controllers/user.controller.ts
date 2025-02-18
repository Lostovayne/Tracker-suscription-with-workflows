import type { NextFunction, Request, Response } from "express";
import type { ErrorType } from "../middleware/error.middleware";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error: ErrorType = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
