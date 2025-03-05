import { Request, Response, NextFunction } from "express";

export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction): void => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        res.status(400).json({ error: "El número de teléfono es requerido." });
        return;
    }

    if (!phoneNumber.startsWith("+52")) {
        res.status(400).json({ error: "El número de teléfono debe incluir el código de país (+52)." });
        return;
    }

    const cleanedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

    const phoneRegex = /^\+52\d{10}$/;
    if (!phoneRegex.test(cleanedPhoneNumber)) {
        res.status(400).json({ error: "El número de teléfono debe ser un número válido de México con formato +52XXXXXXXXXX." });
        return;
    }

    req.body.phoneNumber = cleanedPhoneNumber;
    next();
};
