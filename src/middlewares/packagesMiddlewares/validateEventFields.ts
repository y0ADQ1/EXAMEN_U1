import { Request, Response, NextFunction } from "express";

export const validateEventFields = (req: Request, res: Response, next: NextFunction): void => {
    const { eventDate, eventTime, totalCost, userId, packageEventId } = req.body;

    if (!eventDate || !eventTime || !totalCost || !userId || !packageEventId) {
        res.status(400).json({ error: "Todos los campos son obligatorios" });
        return; // Asegura que el middleware no siga ejecutándose
    }

    next();
};
