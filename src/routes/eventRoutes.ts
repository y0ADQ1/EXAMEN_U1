import express from "express";
import { createEvent } from "../controllers/eventControllers/registerEventController";
import { validateEventFields } from "../middlewares/packagesMiddlewares/validateEventFields";
import { validateDateTime } from "../middlewares/packagesMiddlewares/validateDateTime";
import { validateUserAndPackage } from "../middlewares/packagesMiddlewares/validateUserAndPackage";
import { validateToken } from "../middlewares/loginMiddlewares/validateToken";
import { getUserEvents } from "../controllers/userControllers/getUserEvents";
import { updateEventDate } from "../controllers/eventControllers/updateEventDate";
import { updateEventType } from "../controllers/eventControllers/updateEventType";
import { validateEventPackage } from "../middlewares/packagesMiddlewares/validateEventPackage";
import { validateEventExists } from "../middlewares/packagesMiddlewares/validateEventExists";
import { validateEventDate } from "../middlewares/packagesMiddlewares/validateEventDate";

const router = express.Router();

router.post("/registerEvent", validateToken, validateEventFields, validateDateTime, validateUserAndPackage, createEvent);

router.get("/getUserEvents", validateToken, getUserEvents);

router.put("/updateEventDate/:id", validateToken, validateEventExists, validateEventDate, updateEventDate);

router.put("/updateEventType/:id", validateToken, validateEventExists, updateEventType);

router.put("/updateTablePackage/:id", validateToken, validateEventExists, validateEventPackage, updateEventType);

export default router;
