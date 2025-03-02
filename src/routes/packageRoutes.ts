import express from "express";
import { getPackages } from "../controllers/packageController";
import { validateToken } from "../middlewares/loginMiddlewares/validateToken";

const router = express.Router();

router.get("/packages", validateToken, getPackages);

export default router;