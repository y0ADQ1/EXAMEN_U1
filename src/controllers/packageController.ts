import { Request, Response } from "express";
import { db } from "../config/database";
import { packageEvent } from "../models/packageEvent";

export const getPackages = async (req: Request, res: Response) => {
    try {
        const packages = await db.select().from(packageEvent);

        res.status(200).json({ message: "Paquetes obtenidos exitosamente.", packages });
    } catch (error) {
        console.error("Error obteniendo paquetes:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};