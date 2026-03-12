import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Hello trpc`,
      };
    }),
  
  inputHello: publicProcedure
    .input(z.object({
      text: z.string(),
    }))  
    .query(({ input }) => {
      if (!input.text) {
        return{
          error: "text is required",
        }
      }

      return {
        greeting: `hello ${ input.text }`,
      };
    }),
});
