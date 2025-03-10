import { registerAdmin } from "../controllers/adminControllers/registerAdminController";
import { validateEmail } from "../middlewares/registerAdminMiddlewares/validateEmail";
import { validateName } from "../middlewares/registerAdminMiddlewares/validateName";
import { validatePassword } from "../middlewares/registerAdminMiddlewares/validatePassword";
import { validatePhoneNumber } from "../middlewares/registerAdminMiddlewares/validatePhoneNumber";
import { validateExistingEmail } from "../middlewares/registerAdminMiddlewares/validateExistingEmail";
import express from "express";

const router = express.Router();

router.post("/adminRegister", validateName, validatePhoneNumber, validateEmail, validatePassword, validateExistingEmail, registerAdmin);

export default router;