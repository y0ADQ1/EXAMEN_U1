import { Request, Response } from "express";
import { db } from "../../config/database";
import { users } from "../../models/user";
import { sendSms } from "../../services/twilioService";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.insert(users).values({name, phoneNumber, email, password: hashedPassword, admin: 0}).execute();

        const welcomeMessage = `Bienvenido ${name}, tu cuenta ha sido creada exitosamente. Por este medio estarás recibiendo notificaciones acerca de tus eventos.`;

        try {
            await sendSms(phoneNumber, welcomeMessage);
        } catch (smsError: any) {
            if (smsError.code === 63038) {
                console.warn("Límite diario de mensajes alcanzado. El usuario se registró, pero no se pudo enviar el SMS.");
                res.status(201).json({
                    message: "Usuario registrado exitosamente, pero no se pudo enviar el SMS por límite diario.",
                    user: newUser
                });
                return;
            }

            console.error("Error enviando SMS:", smsError);
            res.status(500).json({ error: "El usuario se registró, pero hubo un problema al enviar el SMS." });
            return;
        }

        res.status(201).json({ message: "Usuario registrado exitosamente.", user: newUser });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
