import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { packageEvent } from "../../models/packageEvent";
import { eq } from "drizzle-orm";

export const validateUserAndPackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, packageEventId } = req.body;

        const userExists = await db.select().from(users).where(eq(users.id, userId));
        if (userExists.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        const packageExists = await db.select().from(packageEvent).where(eq(packageEvent.id, packageEventId));
        if (packageExists.length === 0) {
            res.status(404).json({ error: "Paquete no encontrado" });
            return;
        }

        next();
    } catch (error) {
        console.error("Error en la validación:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
