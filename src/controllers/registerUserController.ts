import { Request, Response } from "express";
import { db } from "../config/database";
import { users } from "../models/user";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const saltRounds = 10; //esto hace que el hash se repita más veces para que la contraseña sea más segura
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.insert(users).values({name, phoneNumber, email, password: hashedPassword, admin: 0,}).execute();

        res.status(201).json({ message: "Usuario registrado exitosamente.", user: newUser });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};