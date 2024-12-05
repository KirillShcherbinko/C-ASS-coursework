import { Router } from "express";

const profileRouter = new Router();

profileRouter.get("/data");
profileRouter.get("/applications");
profileRouter.update("/data");
profileRouter.update("aplications");

export default profileRouter;