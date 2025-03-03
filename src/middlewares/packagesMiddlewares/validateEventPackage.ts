import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { packageEvent } from "../../models/packageEvent";
import { eq } from "drizzle-orm";

export const validateEventPackage = async (req: Request, res: Response, next: NextFunction) => {
    const { packageEventId } = req.body;

    try {
        const packageEventExists = await db
            .select()
            .from(packageEvent)
            .where(eq(packageEvent.id, packageEventId))
            .execute();

        if (packageEventExists.length === 0) {
            return res.status(404).json({ error: "El paquete de mesas no existe." });
        }

        req.packageEvent = packageEventExists[0];
        next();
    } catch (error) {
        console.error("Error validando el paquete de mesas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};