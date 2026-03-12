import { exampleRouter } from "~/server/api/routers/example";
import { tasksRouter } from "~/server/api/routers/tasks";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

// ここにroutersのrouterを宣言してまとめてexportする。
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
