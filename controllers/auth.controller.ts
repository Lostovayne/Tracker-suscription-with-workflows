import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongose from "mongoose";
import { JWT_SECRET } from "../config/env";
import type { ErrorType } from "../middleware/error.middleware";
import User from "../models/user.model";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongose.startSession();
  session.startTransaction();
  try {
    // Logic to create a user
    const { name, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error: ErrorType = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign({ id: newUser[0]._id }, JWT_SECRET!, { expiresIn: "1h" });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error: ErrorType = new Error("Email or password is missing");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await User.findOne({ email }); // Find the user by email

    if (!user) {
      const error: ErrorType = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      const error: ErrorType = new Error("Incorrect password");
      error.statusCode = 401;
      return next(error);
    }

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = (req: Request, res: Response, next: NextFunction) => {};
