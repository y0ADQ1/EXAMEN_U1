import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { users } from "../../models/user";
import { InferInsertModel, eq } from "drizzle-orm";
import { sendSms } from "../../services/twilioService";

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventDate, eventTime, packageEventId, totalCost } = req.body;

        const userId = (req as Request & { user: { userId: number } }).user.userId;

        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado." });
            return;
        }

        await db.insert(events).values({
            eventDate,
            eventTime,
            totalCost,
            packageEventId,
            userId,
            status: "pending"
        });

        if (user.phoneNumber) {
            const eventMessage = `Tu evento ha sido creado correctamente para el ${eventDate} a las ${eventTime}`;
            await sendSms(user.phoneNumber, eventMessage);
        }

        const adminUsers = await db.select().from(users).where(eq(users.admin, 1));
        for (const admin of adminUsers) {
            if (admin.phoneNumber) {
                const adminMessage = `Se ha registrado un nuevo evento por el usuario ${user.email}.`;
                await sendSms(admin.phoneNumber, adminMessage);
            }
        }

        res.status(201).json({ message: "Evento creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
