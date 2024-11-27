import { Router } from "express";
import { createUser } from "../controller/UserController";

export const userRouter = Router();

userRouter.post("/", createUser); 
