import { dbIdSchema } from "@repo/schemas/db/db-id-schema.ts";
import {
  dbTimestampsParsedSchema,
  dbTimestampsSchema,
  dbTimestampsSerializedSchema,
} from "@repo/schemas/db/db-timestamps-schema.ts";
import { z } from "zod/v4";

const rootSchema = z
  .object({
    message: z.string(),
  })
  .merge(dbIdSchema);

export const someDataSchema = rootSchema.merge(dbTimestampsSchema);

export const someDataSerializedSchema = rootSchema.merge(
  dbTimestampsSerializedSchema,
);

export const someDataParsedSchema = rootSchema.merge(dbTimestampsParsedSchema);
