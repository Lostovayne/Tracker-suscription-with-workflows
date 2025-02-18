import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";

const authRoutes = Router();

// /api/v1/auth
authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-out", signOut);

export default authRoutes;
