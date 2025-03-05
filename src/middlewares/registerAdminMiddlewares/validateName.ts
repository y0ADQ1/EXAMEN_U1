import { Request, Response, NextFunction } from "express";

export const validateName = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;

    if (!name || name.length > 60) {
        res.status(400).json({ error: "El nombre es requerido y debe tener máximo 60 caracteres." });
        return;
    }

    next();
};
