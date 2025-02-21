import type { NextFunction, Request, Response } from "express";
import SubscriptionModel from "../models/subscription.model";

export const createSuscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subscription = await SubscriptionModel.create({ ...req.body, user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
