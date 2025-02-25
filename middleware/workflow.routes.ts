import { Router } from "express";

const workflowRouter = Router();


workflowRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export default workflowRouter;
