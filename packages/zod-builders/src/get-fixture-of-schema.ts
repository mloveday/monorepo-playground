import { defaultGenerators } from "@repo/zod-builders/generators.ts";
import type {
  BuilderGeneratorConfig,
  LooseSchemaGenerator,
} from "@repo/zod-builders/types.ts";
import type { $ZodType } from "zod/v4/core";

const matchAndGenerate = (schema: $ZodType, generator: LooseSchemaGenerator) =>
  generator.match(schema) ? { value: generator.generate(schema) } : undefined;

const findMatch = (schema: $ZodType, config?: BuilderGeneratorConfig) => {
  for (const generator of config?.generators ?? []) {
    const result = matchAndGenerate(schema, generator);
    if (result) return result;
  }
  for (const generator of defaultGenerators) {
    const result = matchAndGenerate(schema, generator);
    if (result) return result;
  }
};

export const getFixtureOfSchema = (
  schema: $ZodType,
  config?: BuilderGeneratorConfig,
): unknown => {
  const match = findMatch(schema, config);
  if (match !== undefined) return match.value;

  throw Error(`schema not known: ${schema._zod.def.type}`);
};
