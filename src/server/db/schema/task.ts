import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./common/timestamps";
import { todosTable } from "./todos";

export const tasksTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ...timestamps
});

export const tasksRelations = relations(tasksTable, ({ many }) => ({
  todos: many(todosTable),
}));