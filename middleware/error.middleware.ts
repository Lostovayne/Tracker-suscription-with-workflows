import type { NextFunction, Request, Response } from "express";

export interface ErrorType extends Error {
  statusCode?: number;
  code?: number;
  errors?: { message: string }[] | undefined;
}

const errorMiddleware = (err: ErrorType, req: Request, res: Response, next: NextFunction): void => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.log(err);

    //Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    if (err.name === "MongoError" && err.code === 11000) {
      const message = "Duplicate resource";
      error = new Error(message);
      error.statusCode = 409;
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors || {}).map(val => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
