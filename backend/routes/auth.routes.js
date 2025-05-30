import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);

export default authRoutes;
