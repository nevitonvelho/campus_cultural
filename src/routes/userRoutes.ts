import { Router } from "express";
import { createUser, getUser, deleteUser, getAllUsers, updateUser } from "../controller/UserController";

export const userRouter = Router();

userRouter.post("/", createUser); 
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUser);