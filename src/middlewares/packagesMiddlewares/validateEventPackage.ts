import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { packageEvent } from "../../models/packageEvent";
import { eq } from "drizzle-orm";

interface AuthenticatedRequest extends Request {
    packageEvent?: typeof packageEvent.$inferSelect;
}

export const validateEventPackage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const { packageEventId } = req.body;

    if (!packageEventId || isNaN(packageEventId)) {
        res.status(400).json({ error: "ID de paquete inválido." });
        return;
    }

    try {
        const packageEventExists = await db
            .select()
            .from(packageEvent)
            .where(eq(packageEvent.id, packageEventId));

        if (packageEventExists.length === 0) {
            res.status(404).json({ error: "El paquete de mesas no existe." });
            return;
        }

        req.packageEvent = packageEventExists[0];
        next();
    } catch (error) {
        console.error("Error validando el paquete de mesas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
