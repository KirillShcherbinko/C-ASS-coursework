import { Router } from "express";
import { check } from "express-validator";
import authMiddleware from "../middleware/auth-middleware.js";
import ProfileController from "../controllers/profile-controller.js";

const profileRouter = new Router();

// Получение и редактирование данных профиля
profileRouter.get("/user/:userId", authMiddleware, ProfileController.getProfile);
profileRouter.put("/user/:userId", authMiddleware, ProfileController.updateProfile);

// Получение и редактирование данных заявок
profileRouter.get("/user/:userId", authMiddleware, ProfileController.getApplications);
profileRouter.put("/user/:userId", authMiddleware, [
    check("role", "Неверное значение роли").equals("organization")
], ProfileController.updateApplication);

export default profileRouter;