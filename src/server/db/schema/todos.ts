import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./common/timestamps";
import { tasksTable } from "./task";

export const todosTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasksTable.id, { onDelete: "cascade" }),
  todo: varchar("todo", { length: 255 }).notNull(),
  completed: boolean("completed").notNull().default(false),
  ...timestamps,
});

export const todosRelations = relations(todosTable, ({ one }) => ({
  task: one(tasksTable, {
    fields: [todosTable.taskId],
    references: [tasksTable.id],
  }),
}));