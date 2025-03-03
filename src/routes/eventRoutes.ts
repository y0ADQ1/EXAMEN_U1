import express from "express";
import { createEvent } from "../controllers/eventControllers/registerEventController";
import { validateEventFields } from "../middlewares/packagesMiddlewares/validateEventFields";
import { validateDateTime } from "../middlewares/packagesMiddlewares/validateDateTime";
import { validateUserAndPackage } from "../middlewares/packagesMiddlewares/validateUserAndPackage";
import { validateToken } from "../middlewares/loginMiddlewares/validateToken";
import { getUserEvents } from "../controllers/userControllers/getUserEvents";
import { updateEventDate } from "../controllers/eventControllers/updateEventDate";
import { updateEventType } from "../controllers/eventControllers/updateEventType";
import { updateTablePackage } from "../controllers/eventControllers/updateTablePackage";

const router = express.Router();

router.post("/registerEvent", validateToken, validateEventFields, validateDateTime, validateUserAndPackage, createEvent);
router.get("/getUserEvents", validateToken, getUserEvents);

export default router;
