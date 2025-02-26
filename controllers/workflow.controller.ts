// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import type { WorkflowContext } from "@upstash/workflow";
import dayjs from "dayjs";

import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context: WorkflowContext<unknown>) => {
  const { subscriptionId } = context.requestPayload as {
    subscriptionId: string;
  };

  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;

  // TODO:RenewalDate logic here
  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date is in the past for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }
});

const fetchSubscription = async (context: WorkflowContext, subscriptionId: string) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};
