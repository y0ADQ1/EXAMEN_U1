import express from "express";
import { loginUser } from "../controllers/userControllers/loginController";
import { validateLoginEmail } from "../middlewares/loginMiddlewares/validateLoginEmail";
import { validateLoginPassword } from "../middlewares/loginMiddlewares/validateLoginPassword";

const router = express.Router();

router.post("/login", validateLoginEmail, validateLoginPassword, loginUser);

export default router;