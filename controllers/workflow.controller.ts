// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import type { WorkflowContext } from "@upstash/workflow";
import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model";

export const sendReminders = serve(async (context: WorkflowContext<unknown>) => {
  const { subscriptionId } = context.requestPayload as {
    subscriptionId: string;
  };

  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;

  // TODO:RenewalDate logic here
});

const fetchSubscription = async (context: WorkflowContext, subscriptionId: string) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};
