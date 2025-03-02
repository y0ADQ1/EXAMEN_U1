import { mysqlTable, int, varchar, tinyint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 60 }).notNull(),
    phoneNumber: varchar("phoneNumber", { length: 14 }).notNull(),
    email: varchar("email", { length: 75 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    admin: tinyint("admin").default(0),
});