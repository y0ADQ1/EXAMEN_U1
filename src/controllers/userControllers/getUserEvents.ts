import { Request, Response } from "express";
import { db } from "../../config/database";
import { events } from "../../models/events";
import { packageEvent } from "../../models/packageEvent";
import { tableEvent } from "../../models/tableEvent";
import { eq } from "drizzle-orm";

interface AuthenticatedRequest extends Request {
    user?: { userId: number; email: string };
}

export const getUserEvents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: "Usuario no autenticado." });
        return;
    }

    try {
        const userEvents = await db
            .select({
                id: events.id,
                eventDate: events.eventDate,
                eventTime: events.eventTime,
                totalCost: events.totalCost,
                status: events.status,
                packageEventId: events.packageEventId,
                userId: events.userId,
                package: {
                    id: packageEvent.id,
                    name: packageEvent.name,
                    totalPrice: packageEvent.totalPrice,
                    description: packageEvent.description,
                    waiters: packageEvent.waiters,
                    tableEventId: packageEvent.tableEventId,
                },
                table: {
                    id: tableEvent.id,
                    name: tableEvent.name,
                    pricePerUnit: tableEvent.pricePerUnit,
                    description: tableEvent.description,
                },
            })
            .from(events)
            .innerJoin(packageEvent, eq(events.packageEventId, packageEvent.id))
            .innerJoin(tableEvent, eq(packageEvent.tableEventId, tableEvent.id))
            .where(eq(events.userId, req.user.userId));

        const formattedEvents = userEvents.map((event) => ({
            ...event,
            package: {
                ...event.package,
                table: event.table,
            },
        }));

        res.status(200).json({ events: formattedEvents });
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};