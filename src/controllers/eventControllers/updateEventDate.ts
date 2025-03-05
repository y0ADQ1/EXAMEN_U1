import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { users } from "../../models/user";
import { eq } from "drizzle-orm";
import { sendSms } from "../../services/twilioService";

export const updateEventDate = async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    const { eventDate, eventTime } = req.body;

    try {
        await db
            .update(events)
            .set({
                eventDate,
                eventTime,
            })
            .where(eq(events.id, eventId))
            .execute();

        const adminUsers = await db.select().from(users).where(eq(users.admin, 1));

        for (const admin of adminUsers) {
            if (admin.phoneNumber) {
                const adminMessage = "Se ha actualizado la fecha de un evento";
                await sendSms(admin.phoneNumber, adminMessage);
            }
        }

        res.status(200).json({ message: "Fecha del evento actualizada exitosamente." });
    } catch (error) {
        console.error("Error actualizando la fecha del evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
