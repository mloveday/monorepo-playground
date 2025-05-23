import {
  someDataParsedSchema,
  someDataSerializedSchema,
} from "@repo/schemas/api/some-data/some-data-schema.ts";
import type { z } from "zod/v4";

export const getRecentSomeDataResponseSchema = someDataSerializedSchema.array();
export type GetRecentSomeDataResponse = z.infer<
  typeof getRecentSomeDataResponseSchema
>;
export const getRecentSomeDataParsedResponseSchema =
  someDataParsedSchema.array();
export type GetRecentSomeDataParsedResponse = z.infer<
  typeof getRecentSomeDataParsedResponseSchema
>;
