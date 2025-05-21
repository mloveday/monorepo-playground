import { getFixtureOfObjectSchema } from "@repo/zod-builders/get-fixture-of-object-schema.ts";
import type {
  BuilderGeneratorConfig,
  ObjectBuilder,
  ObjectBuilderInternals,
} from "@repo/zod-builders/types.ts";
import type { ZodObject } from "zod/v4";

const capitalize = <I extends string>(input: I): Capitalize<I> =>
  `${input[0]?.toUpperCase() ?? ""}${input.slice(1)}` as Capitalize<I>;

const withKey = <Key extends string>(key: Key): `with${Capitalize<Key>}` =>
  `with${capitalize(key)}`;

export const generateBuilderFromSchema = <Schema extends ZodObject>(
  schema: Schema,
  config?: BuilderGeneratorConfig,
): ObjectBuilder<Schema> => {
  const builder: ObjectBuilderInternals<Schema> = {
    vals: getFixtureOfObjectSchema(schema, config),
    build: () => builder.vals,
  };
  for (const key of Object.keys(schema.def.shape)) {
    (builder as Record<string, unknown>)[withKey(key)] = (v: unknown) => {
      (builder.vals as Record<string, unknown>)[key] = v;
      return builder;
    };
  }
  return builder as ObjectBuilder<Schema>;
};
