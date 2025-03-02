import express from "express";
import { createEvent } from "../controllers/registerEventController";
import { validateEventFields } from "../middlewares/packagesMiddlewares/validateEventFields";
import { validateDateTime } from "../middlewares/packagesMiddlewares/validateDateTime";
import { validateUserAndPackage } from "../middlewares/packagesMiddlewares/validateUserAndPackage";
import { validateToken } from "../middlewares/loginMiddlewares/validateToken";

const router = express.Router();

router.post("/event", validateToken, validateEventFields, validateDateTime, validateUserAndPackage, createEvent);

export default router;
