import { Router } from "express";
import MainController from "../controllers/main-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateOptionalMiddleware } from "../middleware/validation-middleware.js";
import { validateEventMiddleware } from "../middleware/validation-middleware.js";
import { validateApplicationMiddleware } from "../middleware/validation-middleware.js";


const mainRouter = new Router();

mainRouter.get("/events", MainController.getAllEvents);
mainRouter.post("/events", authMiddleware, validateEventMiddleware, MainController.createEvent);
mainRouter.post("/events/:eventId/apply", authMiddleware, MainController.createApplication);

export default mainRouter;
