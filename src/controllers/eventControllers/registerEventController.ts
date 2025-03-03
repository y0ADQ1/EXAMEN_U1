import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { InferInsertModel } from "drizzle-orm";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const newEvent: InferInsertModel<typeof events> = req.body;

        const [insertedEvent] = await db.insert(events).values(newEvent);

        res.status(201).json({ message: "Evento creado exitosamente", event: insertedEvent });
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
