import express from "express";
import { registerUser } from "../controllers/userControllers/registerUserController";
import {validateName} from "../middlewares/registerUserMiddlewares/validateName";
import {validatePhoneNumber} from "../middlewares/registerUserMiddlewares/validatePhoneNumber";
import {validateEmail} from "../middlewares/registerUserMiddlewares/validateEmail";
import {validatePassword} from "../middlewares/registerUserMiddlewares/validatePassword";
import {validateExistingEmail} from "../middlewares/registerUserMiddlewares/validateExistingEmail";
import { validateExistingPhoneNumber } from "../middlewares/registerUserMiddlewares/validateExistingPhoneNumber";

const router = express.Router();

router.post("/userRegister", validateName, validateExistingPhoneNumber, validatePhoneNumber, validateEmail, validatePassword, validateExistingEmail, registerUser);

export default router;