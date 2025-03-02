import { config } from "dotenv";

config();

export default {
    schema: "./src/models",
    dialect: 'mysql',
    out: "./drizzle",
    dbCredentials: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT),
    },
};