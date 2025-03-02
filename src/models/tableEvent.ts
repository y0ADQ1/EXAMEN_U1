import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const tableEvent = mysqlTable("tableEvent", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 60 }).notNull(),
    pricePerUnit: int("totalPrice").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
});