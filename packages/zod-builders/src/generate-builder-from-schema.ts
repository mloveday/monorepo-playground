import { getFixtureOfObjectSchema } from "@repo/zod-builders/get-fixture-of-object-schema.ts";
import type {
  BuilderGeneratorConfig,
  InputSchema,
  ObjectBuilder,
  ObjectBuilderInternals,
} from "@repo/zod-builders/types.ts";

const capitalize = <I extends string>(input: I): Capitalize<I> =>
  `${input[0]?.toUpperCase() ?? ""}${input.slice(1)}` as Capitalize<I>;

const withKey = <Key extends string>(key: Key): `with${Capitalize<Key>}` =>
  `with${capitalize(key)}`;

export const generateBuilderFromSchema = <Schema extends InputSchema>(
  schema: Schema,
  config?: BuilderGeneratorConfig,
): ObjectBuilder<Schema> => {
  const builder: ObjectBuilderInternals<Schema> = {
    vals: {},
    build: () => ({
      ...getFixtureOfObjectSchema<Schema>(schema, "$", config),
      ...builder.vals,
    }),
  };
  for (const key of Object.keys(schema._zod.def.shape)) {
    (builder as Record<string, unknown>)[withKey(key)] = (v: unknown) => {
      (builder.vals as Record<string, unknown>)[key] = v;
      return builder;
    };
  }
  return builder as ObjectBuilder<Schema>;
};
