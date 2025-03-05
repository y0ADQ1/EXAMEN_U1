import { Request, Response, NextFunction} from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { eq } from "drizzle-orm";

export const validateExistingPhoneNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { phoneNumber } = req.body;

    try {
        const existingNumber = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
        if (existingNumber.length > 0) {
            res.status(400).json({ error: "El número de teléfono ya esta registrado." });
            return;
        }
        next();
    } catch (error) {
        console.error("Error validando el número de teléfono:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};