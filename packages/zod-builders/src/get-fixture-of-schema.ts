import { defaultGenerators } from "@repo/zod-builders/generators.ts";
import type {
  BuilderGeneratorConfig,
  LooseSchemaGenerator,
} from "@repo/zod-builders/types.ts";
import type { $ZodType } from "zod/v4/core";

const matchAndGenerate = (
  schema: $ZodType,
  path: string,
  generator: LooseSchemaGenerator,
  config?: BuilderGeneratorConfig,
) =>
  generator.match(schema)
    ? { value: generator.generate(schema, path, config) }
    : undefined;

const findMatch = (
  schema: $ZodType,
  path: string,
  config?: BuilderGeneratorConfig,
) => {
  for (const generator of config?.generators ?? []) {
    const result = matchAndGenerate(schema, path, generator, config);
    if (result) return result;
  }
  for (const generator of defaultGenerators) {
    const result = matchAndGenerate(schema, path, generator, config);
    if (result) return result;
  }
};

export const getFixtureOfSchema = (
  schema: $ZodType,
  path: string,
  config?: BuilderGeneratorConfig,
): unknown => {
  const pathOverride = config?.paths?.find((p) => p.path === path);
  if (pathOverride !== undefined) return pathOverride.generate();

  const match = findMatch(schema, path, config);
  if (match !== undefined) return match.value;

  throw Error(`schema not known: ${schema._zod.def.type}`);
};
