import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { tableEvent } from "./tableEvent";

export const packageEvent = mysqlTable("packageEvent", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 60 }).notNull(),
    totalPrice: int("totalPrice").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    waiters: int("waiters").notNull(),
    tableEventId: int("tableEventId").notNull().references(() => tableEvent.id, { onDelete: "cascade" })
});