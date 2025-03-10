import { Request, Response, NextFunction } from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { eq, InferSelectModel } from "drizzle-orm";

export const validateLoginEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "El correo electrónico es requerido." });
        return;
    }

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
        res.status(400).json({ error: "El correo electrónico no está registrado." });
        return;
    }

    (req as Request & { user: InferSelectModel<typeof users> }).user = user[0];

    next();
};
