import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { eq, and, not } from "drizzle-orm";

export const validateEventDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { eventDate, eventTime } = req.body;
    const eventId = parseInt(req.params.id);

    if (isNaN(eventId)) {
        res.status(400).json({ error: "ID de evento inválido." });
        return;
    }

    try {
        const conflictingEvent = await db
            .select()
            .from(events)
            .where(
                and(
                    eq(events.eventDate, eventDate),
                    eq(events.eventTime, eventTime),
                    not(eq(events.id, eventId))
                )
            );

        if (conflictingEvent.length > 0) {
            res.status(400).json({ error: "Ya existe un evento en la misma fecha y hora." });
            return;
        }

        next();
    } catch (error) {
        console.error("Error validando la fecha del evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
