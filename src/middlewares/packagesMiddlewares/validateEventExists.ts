import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { eq } from "drizzle-orm";

export const validateEventExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const eventId = parseInt(req.params.id);

    if (isNaN(eventId)) {
        res.status(400).json({ error: "ID de evento inválido." });
        return;
    }

    try {
        const event = await db.select().from(events).where(eq(events.id, eventId));

        if (event.length === 0) {
            res.status(404).json({ error: "Evento no encontrado." });
            return;
        }

        res.locals.event = event[0]; // Guardar el evento en res.locals
        next();
    } catch (error) {
        console.error("Error validando la existencia del evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
