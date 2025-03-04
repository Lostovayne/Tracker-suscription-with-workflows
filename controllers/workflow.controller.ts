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

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before renewal`, reminderDate);
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before renewal`);
  }
});

const fetchSubscription = async (context: WorkflowContext, subscriptionId: string) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context: WorkflowContext, label: string, date: any) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
  console.log(`Waking up from ${label} reminder at ${date}`);
};

const triggerReminder = async (context: WorkflowContext, label: string) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // Send Email, SMS, etc.
  });
};
