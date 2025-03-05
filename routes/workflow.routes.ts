import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller";

const workflowRoutes = Router();

workflowRoutes.post("/subscription/reminder", sendReminders);

export default workflowRoutes;
