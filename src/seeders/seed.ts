import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { tableEvent } from "../models/tableEvent";
import { packageEvent } from "../models/packageEvent";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT),
    });

    const db = drizzle(connection);

    try {
        const tables = await db.insert(tableEvent).values([
            {
                name: "Mesa básica",
                pricePerUnit: 500,
                description: "Mesa estándar para 10 personas",
            },
            {
                name: "Mesa VIP",
                pricePerUnit: 800,
                description: "Mesa premium para 10 personas con decoración especial",
            },
        ]).execute();

        console.log("Datos insertados en `tableEvent`:", tables);

        const packages = await db.insert(packageEvent).values([
            {
                name: "Paquete Sencillo",
                totalPrice: 15000,
                description: "Paquete para 150 personas, incluye 15 mesas básicas y 10 meseros",
                waiters: 10,
                tableEventId: 1,
            },
            {
                name: "Paquete VIP",
                totalPrice: 30000,
                description: "Paquete para 150 personas, incluye 15 mesas VIP y 15 meseros",
                waiters: 15,
                tableEventId: 2,
            },
            {
                name: "Paquete Premium",
                totalPrice: 50000,
                description: "Paquete para 200 personas, incluye 20 mesas VIP y 20 meseros",
                waiters: 20,
                tableEventId: 2,
            },
        ]).execute();

        console.log("Datos insertados en `packageEvent`:", packages);

        console.log("Seeder ejecutado con éxito.");
    } catch (error) {
        console.error("Error ejecutando el seeder:", error);
    } finally {
        await connection.end();
    }
}

seed();