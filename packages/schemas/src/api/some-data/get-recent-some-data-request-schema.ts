import { z } from "zod/v4";

export const getRecentSomeDataRequestSchema = z.object({
  count: z.number().optional(),
  cursor: z.number().optional(),
});

export type GetRecentSomeDataRequest = z.infer<
  typeof getRecentSomeDataRequestSchema
>;

export const getRecentSomeDataRequestParsedSchema = z.object({
  count: z.coerce.number().optional().default(10),
  cursor: z.coerce.number().optional(),
});

export type getRecentSomeDataRequestParsed = z.infer<
  typeof getRecentSomeDataRequestParsedSchema
>;
