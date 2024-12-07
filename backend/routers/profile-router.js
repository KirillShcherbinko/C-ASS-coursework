import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateOptionalMiddleware } from "../middleware/validation-middleware.js";
import ProfileController from "../controllers/profile-controller.js";

const profileRouter = new Router();

// Получение и редактирование данных профиля
profileRouter.get(
    "/users", 
    authMiddleware, 
    ProfileController.getProfile
);
profileRouter.put(
    "/users", 
    authMiddleware, 
    validateOptionalMiddleware, 
    ProfileController.updateProfile
);

// Получение и редактирование данных заявок
profileRouter.get(
    "/users/applications", 
    authMiddleware, 
    ProfileController.getApplications
);
profileRouter.put(
    "/users/applications/:applicationId", 
    authMiddleware, 
    ProfileController.updateApplication
);

export default profileRouter;