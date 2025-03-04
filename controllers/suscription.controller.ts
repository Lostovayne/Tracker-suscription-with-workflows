import type { NextFunction, Request, Response } from "express";
import { SERVER_URL } from "../config/env";
import { workflowClient } from "../config/upstash";
import type { ErrorType } from "../middleware/error.middleware";
import Subscription from "../models/subscription.model";

export const createSuscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subscription = await Subscription.create({ ...req.body, user: req.user._id });

    // Trigger workflow to send reminders
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // checkea que el id del param sea el mismo del user
    if (req.user.id !== req.params.id) {
      const error: ErrorType = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Subscriptions found successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
