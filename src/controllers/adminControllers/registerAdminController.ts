import { Request, Response } from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { sendSms } from "../../services/twilioService";
import bcrypt from "bcrypt";

export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = await db.insert(users).values({name, phoneNumber, email, password: hashedPassword, admin: 1}).execute();

        const welcomeMessage = `Bienvenido ${name}, tu cuenta ha sido creada exitosamente. Estamos muy contentos de que seas uno de nuestros asistentes.`;

        try {
            await sendSms(phoneNumber, welcomeMessage);
        } catch (smsError: any) {
            if (smsError.code === 63038) {
                console.warn("Límite diario de mensajes alcanzado. El administrador se registró, pero no se pudo enviar el SMS.");
                res.status(201).json({
                    message: "Administrador registrado exitosamente, pero no se pudo enviar el SMS por límite diario.",
                    user: newAdmin
                });
                return;
            }

            console.error("Error enviando SMS:", smsError);
            res.status(500).json({ error: "El administrador se registró, pero hubo un problema al enviar el SMS." });
            return;
        }

        res.status(201).json({ message: "Administrador registrado exitosamente.", user: newAdmin });
    } catch (error) {
        console.error("Error registrando al Administrador:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
