import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasksTable } from "~/server/db/schema";

export const tasksRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const [task] = await db.insert(tasksTable).values({
        name: input.name,
        description: input.description,
      }).returning();
      return task;
    }),
});