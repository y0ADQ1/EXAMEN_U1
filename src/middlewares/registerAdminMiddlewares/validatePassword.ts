import { Request, Response, NextFunction } from "express";

export const validatePassword = (req: Request, res: Response, next: NextFunction): void => {
    const { password } = req.body;
    if (!password || password.length > 30) {
        res.status(400).json({ error: "La contraseña es requerida y debe tener máximo 30 caracteres." });
        return;
    }
    next();
};