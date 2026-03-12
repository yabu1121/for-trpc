import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { projects } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1), 
      description: z.string().optional(),
      baseUrl: z.string().url().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(projects).values(input).returning();
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.projects.findMany({
      with: {
        endpoints: true,
      },
      orderBy: [desc(projects.createdAt)],
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
        with: {
          endpoints: {
            with: {
              parameters: true,
              responses: true,
              tags: {
                with: {
                  tag: true,
                }
              }
            }
          }
        }
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(projects).where(eq(projects.id, input.id)).returning();
    }),
});
