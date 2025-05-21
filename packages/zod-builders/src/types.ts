import type { z } from "zod/v4";
import type { $ZodObject, $ZodType } from "zod/v4/core";

type WithProperty<Schema extends $ZodObject, Property> = (
  val: Property,
) => ObjectBuilder<Schema>;

type ObjectBuilderWithers<Schema extends $ZodObject> = {
  [Key in keyof z.infer<Schema> &
    string as `with${Capitalize<Key>}`]: WithProperty<
    Schema,
    z.infer<Schema>[Key]
  >;
};

export type ObjectBuilderVals<Schema extends $ZodObject> = {
  [Key in keyof z.infer<Schema>]: z.infer<Schema>[Key];
};

export type ObjectBuilderInternals<Schema extends $ZodObject> = {
  vals: ObjectBuilderVals<Schema>;
  build: () => z.infer<Schema>;
};

export type ObjectBuilder<Schema extends $ZodObject> =
  ObjectBuilderWithers<Schema> & ObjectBuilderInternals<Schema>;

type SchemaMatcher<T extends $ZodType> = (schema: $ZodType) => schema is T;

// The "strict" SchemaGenerator type is only required for constraining the
//  definition of the generator, as it needs to know the internals of the
//  zod schema. Usage of them does not require this level of detail.
export type LooseSchemaGenerator = {
  // biome-ignore lint/suspicious/noExplicitAny: see above
  match: SchemaMatcher<any>;
  // biome-ignore lint/suspicious/noExplicitAny: see above
  generate: (schema: any, config?: BuilderGeneratorConfig) => unknown;
};

export type SchemaGenerator<SchemaType extends $ZodType> = {
  match: SchemaMatcher<SchemaType>;
  generate: (
    schema: SchemaType,
    config?: BuilderGeneratorConfig,
  ) => z.infer<SchemaType>;
};

export type BuilderGeneratorConfig = {
  generators?: LooseSchemaGenerator[];
};
