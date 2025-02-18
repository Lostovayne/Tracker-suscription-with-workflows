import { Router } from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", (req, res) => {
  res.send({ title: "GET Fetch all subscriptions" });
});

subscriptionRoutes.get("/:id", (req, res) => {
  res.send({ title: "GET Fetch subscription by id" });
});

subscriptionRoutes.post("/", (req, res) => {
  res.send({ title: "POST Create subscription" });
});

subscriptionRoutes.put("/:id", (req, res) => {
  res.send({ title: "PUT Update subscription" });
});

subscriptionRoutes.delete("/:id", (req, res) => {
  res.send({ title: "DELETE Delete subscription" });
});

subscriptionRoutes.get("/user/:id", (req, res) => {
  res.send({ title: "GET user id  Fetch subscription by id" });
});

subscriptionRoutes.put("/:id/cancel", (req, res) => {
  res.send({ title: "PUT  Cancel subscription by id" });
});

subscriptionRoutes.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET Fetch upcoming renewals" });
});

export default subscriptionRoutes;
