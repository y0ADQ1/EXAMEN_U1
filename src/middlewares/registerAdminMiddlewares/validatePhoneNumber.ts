import { Request, Response, NextFunction } from "express";

export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction): void => {
    const { phoneNumber } = req.body;
    if (!phoneNumber || phoneNumber.length > 14) {
        res.status(400).json({ error: "El número de teléfono es requerido y debe tener máximo 14 caracteres." });
        return;
    }
    next();
};