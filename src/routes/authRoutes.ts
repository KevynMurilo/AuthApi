import { Router } from "express";
import { UserLoginController } from "../controllers/authUser/UserLoginController";

const router = Router();

router.post("/login", new UserLoginController().handle);

export { router as authRoutes };