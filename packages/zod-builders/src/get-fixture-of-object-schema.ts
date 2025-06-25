import { getFixtureOfSchema } from "@repo/zod-builders/get-fixture-of-schema.ts";
import type {
  BuilderGeneratorConfig,
  ObjectBuilderVals,
} from "@repo/zod-builders/types.ts";
import type { $ZodObject } from "zod/v4/core";

export const getFixtureOfObjectSchema = <Schema extends $ZodObject>(
  schema: Schema,
  path: string,
  config?: BuilderGeneratorConfig,
): ObjectBuilderVals<Schema> =>
  Object.entries(schema._zod.def.shape).reduce(
    (acc, [k, propSchema]) => {
      acc[k] = getFixtureOfSchema(propSchema, `${path}.${k}`, config);
      return acc;
    },
    {} as Record<string, unknown>,
  ) as ObjectBuilderVals<Schema>;
