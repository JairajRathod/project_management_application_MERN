import z from "zod";

export const idCheckMiddleware = z.object({
  id: z.string(),
});
