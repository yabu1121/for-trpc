import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { endpoints, parameters, responses, tags, endpointsToTags } from "~/server/db/schema";
import { eq, like } from "drizzle-orm";

export const endpointRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      projectId: z.number(),
      path: z.string().min(1),
      method: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(endpoints).values(input).returning();
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(endpoints).where(eq(endpoints.id, input.id)).returning();
    }),

  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.endpoints.findMany({
        where: input.query ? like(endpoints.path, `%${input.query}%`) : undefined,
        with: {
          project: true,
        }
      });
    }),

  addParameter: publicProcedure
    .input(z.object({
      endpointId: z.number(),
      name: z.string(),
      location: z.enum(["query", "path", "header", "cookie"]),
      dataType: z.string().optional(),
      required: z.boolean().default(false),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { required, ...rest } = input;
      return ctx.db.insert(parameters).values({
        ...rest,
        required: required ? 1 : 0
      }).returning();
    }),

  addResponse: publicProcedure
    .input(z.object({
      endpointId: z.number(),
      statusCode: z.number(),
      description: z.string().optional(),
      schemaJson: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(responses).values(input).returning();
    }),

  addTag: publicProcedure
    .input(z.object({
      endpointId: z.number(),
      tagName: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Find or create tag
      let tag = await ctx.db.query.tags.findFirst({
        where: eq(tags.name, input.tagName),
      });

      if (!tag) {
        const [newTag] = await ctx.db.insert(tags).values({ name: input.tagName }).returning();
        tag = newTag!;
      }

      // Assign to endpoint
      return ctx.db.insert(endpointsToTags).values({
        endpointId: input.endpointId,
        tagId: tag.id,
      }).returning();
    }),
});
