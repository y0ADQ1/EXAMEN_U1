import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../models/user";

export const validateLoginPassword = async (req: Request & { user?: InferSelectModel<typeof users> }, res: Response, next: NextFunction): Promise<void> => {
    const { password } = req.body;

    if (!password) {
        res.status(400).json({ error: "La contraseña es requerida." });
        return;
    }

    if (!req.user) {
        res.status(400).json({ error: "Usuario no encontrado." });
        return;
    }

    const isValidPassword = await bcrypt.compare(password, req.user.password);
    if (!isValidPassword) {
        res.status(400).json({ error: "La contraseña es incorrecta." });
        return;
    }

    next();
};
