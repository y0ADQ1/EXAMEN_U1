import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { eq } from "drizzle-orm";

export const updateTablePackage = async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    const { packageEventId } = req.body;

    try {
        // Obtener el precio del nuevo paquete
        const newPackage = req.packageEvent;

        // Actualizar el evento con el nuevo paquete y recalcular el precio
        await db
            .update(events)
            .set({
                packageEventId: newPackage.id,
                totalCost: newPackage.totalPrice, // Recalcular el precio
            })
            .where(eq(events.id, eventId))
            .execute();

        res.status(200).json({ message: "Paquete de mesas actualizado exitosamente." });
    } catch (error) {
        console.error("Error actualizando el paquete de mesas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};