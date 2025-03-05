import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { users } from "../../models/user";
import { eq } from "drizzle-orm";
import { packageEvent } from "../../models/packageEvent";
import { sendSms } from "../../services/twilioService";

interface AuthenticatedRequest extends Request {
    packageEvent?: typeof packageEvent.$inferSelect;
}

export const updateEventType = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const eventId = parseInt(req.params.id);
    const { packageEventId } = req.body;

    if (!packageEventId || isNaN(packageEventId)) {
        res.status(400).json({ error: "ID de paquete inválido." });
        return;
    }

    try {
        const newPackage = req.packageEvent;
        if (!newPackage) {
            res.status(400).json({ error: "Paquete no válido." });
            return;
        }

        await db
            .update(events)
            .set({
                packageEventId: newPackage.id,
                totalCost: newPackage.totalPrice,
            })
            .where(eq(events.id, eventId));

        const adminUsers = await db.select().from(users).where(eq(users.admin, 1));

        for (const admin of adminUsers) {
            if (admin.phoneNumber) {
                const adminMessage = "Se ha actualizado el paquete de un evento";
                await sendSms(admin.phoneNumber, adminMessage);
            }
        }

        res.status(200).json({ message: "Paquete de evento actualizado exitosamente." });
    } catch (error) {
        console.error("Error actualizando el paquete de evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
