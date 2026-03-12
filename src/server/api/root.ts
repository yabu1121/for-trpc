import { projectRouter } from "~/server/api/routers/project";
import { endpointRouter } from "~/server/api/routers/endpoint";
import { userRouter } from "~/server/api/routers/user";
import { testDataRouter } from "~/server/api/routers/test_data";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  endpoint: endpointRouter,
  user: userRouter,
  testData: testDataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
