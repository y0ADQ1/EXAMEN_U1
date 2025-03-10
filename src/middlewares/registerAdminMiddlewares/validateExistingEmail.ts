import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { eq } from "drizzle-orm";

export const validateExistingEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            res.status(400).json({ error: "El correo electrónico ya está registrado." });
            return;
        }

        next();
    } catch (error) {
        console.error("Error validando el correo electrónico:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
