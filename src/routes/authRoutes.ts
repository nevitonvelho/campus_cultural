import { Router } from "express";
import { login } from "../controller/AuthController";

export const authRouter = Router();

authRouter.post("/login", login);
