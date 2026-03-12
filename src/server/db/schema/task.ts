import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./common/timestamps";

export const tasksTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ...timestamps
});