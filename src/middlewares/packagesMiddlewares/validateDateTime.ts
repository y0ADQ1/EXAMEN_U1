import { Request, Response, NextFunction } from "express";

export const validateDateTime = (req: Request, res: Response, next: NextFunction): void => {
    const { eventDate, eventTime } = req.body;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;

    if (!dateRegex.test(eventDate) || !timeRegex.test(eventTime)) {
        res.status(400).json({ error: "Formato de fecha u hora inválido" });
        return;
    }

    next();
};
