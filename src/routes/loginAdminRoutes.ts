import express from "express";
import { loginAdmin } from "../controllers/adminControllers/loginController"
import { validateLoginAdminEmail } from "../middlewares/loginAdminMiddlewares/validateLoginEmail"
import { validateLoginAdminPassword } from "../middlewares/loginAdminMiddlewares/validateLoginPassword"

const router = express.Router();

router.post("/loginAdmin", validateLoginAdminEmail, validateLoginAdminPassword, loginAdmin);

export default router;

