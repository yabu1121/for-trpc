import { exampleRouter } from "~/server/api/routers/example";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

// ここにroutersのrouterを宣言してまとめてexportする。
export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
