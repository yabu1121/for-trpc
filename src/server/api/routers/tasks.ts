import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasksTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const tasksRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const [task] = await db
        .insert(tasksTable)
        .values({
          name: input.name,
          description: input.description,
        })
        .returning();
      return task;
    }),

  getAllTasks: publicProcedure
    .query(async ({ ctx }) => {
      const { db } = ctx;
      return await db
        .select()
        .from(tasksTable);
    }),

  deleteTask: publicProcedure
    .input(z.object({
      id: string(),
    }))
    .mutation( async ({ ctx, input }) => {
      const { db } = ctx;
      const task = await db
        .query
        .tasksTable
        .findFirst({
          where: eq(tasksTable.id, input.id),
        });
      if (!task) {
        throw new Error("Task not found");
      }
      await db
        .delete(tasksTable)
        .where(eq(tasksTable.id, input.id));
      return task;
    }),

  updateTask: publicProcedure
    .input(z.object({
      id: string(),
      name: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const [task] = await db
        .update(tasksTable)
        .set({
          name: input.name,
          description: input.description,
        })
        .where(eq(tasksTable.id, input.id))
        .returning();
      return task;
    }),
});