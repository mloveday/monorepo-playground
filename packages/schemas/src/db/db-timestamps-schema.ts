import { z } from "zod";

export const dbTimestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().nullable(),
});

export const dbTimestampsSerializedSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  expiresAt: z.string().nullable(),
});

export const dbTimestampsParsedSchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date().nullable(),
});
