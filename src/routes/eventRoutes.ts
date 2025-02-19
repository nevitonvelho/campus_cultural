import { Router } from "express";
import { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent } from "../controller/EventController";

export const eventRouter = Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);