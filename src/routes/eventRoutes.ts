import { Router } from "express";
import { createEvent } from "../controller/EventController"; 

export const eventRouter = Router();

eventRouter.post("/", createEvent);  
eventRouter.get("/eventos", )