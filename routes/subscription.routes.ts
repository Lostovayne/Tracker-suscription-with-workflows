import { Router } from "express";
import { createSuscription, getUserSubscriptions } from "../controllers/suscription.controller";
import authorize from "../middleware/auth.middleware";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", (req, res) => {
  res.send({ title: "GET Fetch all subscriptions" });
});

subscriptionRoutes.get("/:id", (req, res) => {
  res.send({ title: "GET Fetch subscription by idid" });
});

subscriptionRoutes.post("/", authorize, createSuscription);

subscriptionRoutes.put("/:id", (req, res) => {
  res.send({ title: "PUT Update subscription" });
});

subscriptionRoutes.delete("/:id", (req, res) => {
  res.send({ title: "DELETE Delete subscription" });
});

subscriptionRoutes.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRoutes.put("/:id/cancel", (req, res) => {
  res.send({ title: "PUT  Cancel subscription by id" });
});

subscriptionRoutes.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET Fetch upcoming renewals" });
});

export default subscriptionRoutes;
