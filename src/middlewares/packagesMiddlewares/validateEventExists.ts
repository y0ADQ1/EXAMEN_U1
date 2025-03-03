import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { eq } from "drizzle-orm";

export const validateEventExists = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = parseInt(req.params.id);

    try {
        const event = await db.select().from(events).where(eq(events.id, eventId)).execute();

        if (event.length === 0) {
            return res.status(404).json({ error: "Evento no encontrado." });
        }

        req.event = event[0];
        next();
    } catch (error) {
        console.error("Error validando la existencia del evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};