import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (userId: number, email: string) => {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "10m" });
};