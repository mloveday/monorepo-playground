import { faker } from "@faker-js/faker/locale/en";
import type { $ZodType } from "zod/src/v4/core/schemas.ts";
import type { ZodObject, z } from "zod/v4";

type WithProperty<Schema extends ZodObject, Property> = (
  val: Property,
) => ObjectBuilder<Schema>;

type ObjectBuilderWithers<Schema extends ZodObject> = {
  [Key in keyof z.infer<Schema> &
    string as `with${Capitalize<Key>}`]: WithProperty<
    Schema,
    z.infer<Schema>[Key]
  >;
};

type ObjectBuilderVals<Schema extends ZodObject> = {
  [Key in keyof z.infer<Schema>]: z.infer<Schema>[Key];
};

type ObjectBuilderInternals<Schema extends ZodObject> = {
  vals: ObjectBuilderVals<Schema>;
  build: () => z.infer<Schema>;
};

type ObjectBuilder<Schema extends ZodObject> = ObjectBuilderWithers<Schema> &
  ObjectBuilderInternals<Schema>;

const capitalize = <I extends string>(input: I): Capitalize<I> =>
  `${input[0]?.toUpperCase() ?? ""}${input.slice(1)}` as Capitalize<I>;

const withKey = <Key extends string>(key: Key): `with${Capitalize<Key>}` =>
  `with${capitalize(key)}`;

const getValueFromSchema = (schema: $ZodType): unknown => {
  switch (schema.def.type) {
    case "string":
      return faker.string.alpha();
    case "boolean":
      return faker.datatype.boolean();
    case "number":
      return faker.number.int();
    case "bigint":
      return faker.number.bigInt();
    case "object":
      return getValsFromObject(schema);
    case "optional":
    case "undefined":
      return undefined;
    case "null":
    case "nullable":
      return null;
    case "array":
      return Array.from({ length: 5 }).map(() =>
        getValueFromSchema(schema.def.element),
      );
    case "pipe":
      if (schema.def.out.def.type === "transform") {
        return schema.def.out.def.transform(getValueFromSchema(schema.def.in));
      }
      return getValueFromSchema(schema.def.out);
  }
  if (schema.def.innerType === undefined) {
    throw Error(`schema not known: ${schema.def.type}`);
  }
  return getValueFromSchema(schema.def.innerType);
};

const getValsFromObject = <Schema extends ZodObject>(
  schema: Schema,
): ObjectBuilderVals<Schema> =>
  Object.entries(schema._zod.def.shape).reduce(
    (acc, [k, propSchema]) => {
      acc[k] = getValueFromSchema(propSchema);
      return acc;
    },
    {} as Record<string, unknown>,
  ) as ObjectBuilderVals<Schema>;

export const generateBuilderFromSchema = <Schema extends ZodObject>(
  schema: Schema,
): ObjectBuilder<Schema> => {
  const builder: ObjectBuilderInternals<Schema> = {
    vals: getValsFromObject(schema),
    build: () => builder.vals,
  };
  for (const key of Object.keys(schema._zod.def.shape)) {
    (builder as Record<string, unknown>)[withKey(key)] = (v: unknown) => {
      (builder.vals as Record<string, unknown>)[key] = v;
      return builder;
    };
  }
  return builder as ObjectBuilder<Schema>;
};
