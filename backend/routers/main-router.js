import { Router } from "express";
import MainController from "../controllers/main-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { check } from "express-validator";
import { validateOptionalMiddleware } from "../middleware/validation-middleware.js";
import { validateEventMiddleware } from "../middleware/validation-middleware.js";
import { validateApplicationMiddleware } from "../middleware/validation-middleware.js";


const mainRouter = new Router();

mainRouter.get("/events", MainController.getAllEvents);
mainRouter.post("/events", authMiddleware, validateEventMiddleware, MainController.createEvent);

//mainRouter.post("/applications");

export default mainRouter;
