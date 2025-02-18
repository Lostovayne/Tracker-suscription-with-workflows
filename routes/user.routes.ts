import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import authorize from "../middleware/auth.middleware";

const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:id", authorize, getUser);

userRoutes.post("/", (req, res) => {
  res.send({ title: "POST Create user" });
});

userRoutes.put("/:id", (req, res) => {
  res.send({ title: "PUT Update user" });
});

userRoutes.delete("/:id", (req, res) => {
  res.send({ title: "DELETE Delete user" });
});

export default userRoutes;
