import { faker } from "@faker-js/faker/locale/en";
import { getFixtureOfObjectSchema } from "@repo/zod-builders/get-fixture-of-object-schema.ts";
import { getFixtureOfSchema } from "@repo/zod-builders/get-fixture-of-schema.ts";
import type {
  LooseSchemaGenerator,
  SchemaGenerator,
} from "@repo/zod-builders/types.ts";
import type {
  $ZodArray,
  $ZodBigInt,
  $ZodBoolean,
  $ZodNumber,
  $ZodObject,
  $ZodPipe,
  $ZodString,
  $ZodTransformDef,
  $ZodType,
} from "zod/v4/core";

export const stringGenerator = {
  match: (schema): schema is $ZodString => schema._zod.def.type === "string",
  generate: () => faker.string.alpha(8),
} satisfies SchemaGenerator<$ZodString>;

export const booleanGenerator = {
  match: (schema): schema is $ZodBoolean => schema._zod.def.type === "boolean",
  generate: () => faker.datatype.boolean(),
} satisfies SchemaGenerator<$ZodBoolean>;

export const numberGenerator = {
  match: (schema): schema is $ZodNumber => schema._zod.def.type === "number",
  generate: () => faker.number.int(),
} satisfies SchemaGenerator<$ZodNumber>;

export const bigIntGenerator = {
  match: (schema): schema is $ZodBigInt => schema._zod.def.type === "bigint",
  generate: () => faker.number.bigInt(),
} satisfies SchemaGenerator<$ZodBigInt>;

export const objectGenerator = {
  match: (schema): schema is $ZodObject => schema._zod.def.type === "object",
  generate: (schema, config) => getFixtureOfObjectSchema(schema, config),
} satisfies SchemaGenerator<$ZodObject>;

export const undefinedGenerator = {
  match: (schema): schema is $ZodType =>
    schema._zod.def.type === "optional" || schema._zod.def.type === "undefined",
  generate: () => undefined,
} satisfies SchemaGenerator<$ZodType>;

export const nullGenerator = {
  match: (schema): schema is $ZodType =>
    schema._zod.def.type === "null" || schema._zod.def.type === "nullable",
  generate: () => null,
} satisfies SchemaGenerator<$ZodType>;

export const arrayGenerator = {
  match: (schema): schema is $ZodArray => schema._zod.def.type === "array",
  generate: (schema, config) =>
    Array.from({ length: 5 }).map(() =>
      getFixtureOfSchema(schema._zod.def.element, config),
    ),
} satisfies SchemaGenerator<$ZodArray>;

const isPipe = (schema: $ZodType): schema is $ZodPipe =>
  schema._zod.def.type === "pipe";

export const transformGenerator = {
  match: (schema): schema is $ZodPipe =>
    isPipe(schema) && schema._zod.def.out._zod.def.type === "transform",
  generate: (schema, config) =>
    (schema._zod.def.out._zod.def as $ZodTransformDef).transform(
      getFixtureOfSchema(schema._zod.def.in, config),
      { value: undefined, issues: [] },
    ),
} satisfies SchemaGenerator<$ZodPipe>;

export const pipeGenerators = {
  match: isPipe,
  generate: (schema, config) => getFixtureOfSchema(schema._zod.def.out, config),
} satisfies SchemaGenerator<$ZodPipe>;

export const defaultGenerators: LooseSchemaGenerator[] = [
  stringGenerator,
  booleanGenerator,
  numberGenerator,
  bigIntGenerator,
  objectGenerator,
  undefinedGenerator,
  nullGenerator,
  arrayGenerator,
  transformGenerator,
  pipeGenerators,
];
