import { mysqlTable, int, date, time, mysqlEnum } from "drizzle-orm/mysql-core";
import { users } from "./user";
import { packageEvent } from "./packageEvent";

export const events = mysqlTable("events", {
    id: int("id").primaryKey().autoincrement(),
    eventDate: date("eventDate").notNull(),
    eventTime: time("eventTime").notNull(),
    totalCost: int("totalCost").notNull(),
    status: mysqlEnum("status", ["pending", "cancelled", "confirmed", "completed"]).default("pending"),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    packageEventId: int("packageEventId").notNull().references(() => packageEvent.id, { onDelete: "cascade" })
});