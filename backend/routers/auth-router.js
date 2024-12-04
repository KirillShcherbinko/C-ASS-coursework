import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";
import validateData from "../middleware/validation-middleware.js";

const authRouter = new Router()

authRouter.post("/registration", validateData, AuthController.registration);
authRouter.post("/login", AuthController.login);

export default authRouter;