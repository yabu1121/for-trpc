import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cafes, posts, zipcodes, users } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const testDataRouter = createTRPCRouter({
  // Cafe
  getCafes: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.cafes.findMany({
      orderBy: [desc(cafes.createdAt)],
    });
  }),

  // Posts
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
    });
  }),

  // Zipcodes
  getZipcodes: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.zipcodes.findMany();
  }),

  // Seeding
  seed: publicProcedure.mutation(async ({ ctx }) => {
    // 1. Seed Users if empty
    const existingUsers = await ctx.db.query.users.findMany();
    let userList = existingUsers;
    if (existingUsers.length === 0) {
      userList = await ctx.db.insert(users).values([
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" },
      ]).returning();
    }

    const userId = userList[0]?.id ?? 1;

    // 2. Seed Cafes
    await ctx.db.insert(cafes).values([
      { name: "Blue Bottle Coffee", address: "Shibuya, Tokyo", rating: 5 },
      { name: "Starbucks", address: "Shinjuku, Tokyo", rating: 4 },
      { name: "Cafe de L'Ambre", address: "Ginza, Tokyo", rating: 5 },
    ]).onConflictDoNothing();

    // 3. Seed Posts
    await ctx.db.insert(posts).values([
      { title: "First Post", content: "Hello world!", userId },
      { title: "Next.js 15 is great", content: "I love the new features.", userId },
    ]).onConflictDoNothing();

    // 4. Seed Zipcodes
    await ctx.db.insert(zipcodes).values([
      { code: "150-0001", prefecture: "Tokyo", city: "Shibuya", town: "Jingumae" },
      { code: "100-0005", prefecture: "Tokyo", city: "Chiyoda", town: "Marunouchi" },
      { code: "530-0001", prefecture: "Osaka", city: "Osaka", town: "Umeda" },
    ]).onConflictDoNothing();

    return { message: "Seeding completed successfully" };
  }),
});
