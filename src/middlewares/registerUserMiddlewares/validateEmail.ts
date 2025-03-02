import { Request, Response, NextFunction } from "express";

export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({ error: "El correo electrónico es inválido." });
        return;
    }
    next();
};