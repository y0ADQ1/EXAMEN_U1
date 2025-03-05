import { Request, Response } from "express";
import { generateToken } from "../../config/jwt";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../models/user";

export const loginAdmin = async (req: Request & { user?: InferSelectModel<typeof users> }, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(400).json({ error: "Administrador no encontrado." });
        return;
    }

    try {
        const token = generateToken(req.user.id, req.user.email);

        res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
