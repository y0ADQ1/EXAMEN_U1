import { Request, Response } from "express";
import { db } from "../../config/database";
import { packageEvent } from "../../models/packageEvent";
import { eq } from "drizzle-orm";

export const getPackages = async (req: Request, res: Response) => {
    try {
        const packages = await db.select().from(packageEvent);

        res.status(200).json({ message: "Paquetes obtenidos exitosamente.", packages });
    } catch (error) {
        console.error("Error obteniendo paquetes:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getPackageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const packageId = parseInt(req.params.id);
        if (isNaN(packageId)) {
            res.status(400).json({ error: "ID de paquete inválido." });
            return;
        }

        const [pkg] = await db.select().from(packageEvent).where(eq(packageEvent.id, packageId)).limit(1);

        if (!pkg) {
            res.status(404).json({ error: "Paquete no encontrado." });
            return;
        }

        res.status(200).json({ message: "Paquete obtenido exitosamente.", package: pkg });
    } catch (error) {
        console.error("Error obteniendo paquete:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};