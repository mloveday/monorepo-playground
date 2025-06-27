import type { z } from "zod/v4";
import type { $ZodType } from "zod/v4/core";

export type InputSchema = ReturnType<typeof z.object>;

type WithProperty<Schema extends InputSchema, Property> = (
  val: Property,
) => ObjectBuilder<Schema>;

type ObjectBuilderWithers<Schema extends InputSchema> = {
  [Key in keyof z.infer<Schema> &
    string as `with${Capitalize<Key>}`]: WithProperty<
    Schema,
    z.infer<Schema>[Key]
  >;
};

export type ObjectBuilderInternals<Schema extends InputSchema> = {
  vals: Partial<z.infer<Schema>>;
  build: () => z.infer<Schema>;
};

export type ObjectBuilder<Schema extends InputSchema> =
  ObjectBuilderWithers<Schema> & ObjectBuilderInternals<Schema>;

type SchemaMatcher<T extends $ZodType> = (schema: $ZodType) => schema is T;

// The "strict" SchemaGenerator type is only required for constraining the
//  definition of the generator, as it needs to know the internals of the
//  zod schema. Usage of them does not require this level of detail.
export type LooseSchemaGenerator = {
  // biome-ignore lint/suspicious/noExplicitAny: see above
  match: SchemaMatcher<any>;
  generate: (
    // biome-ignore lint/suspicious/noExplicitAny: see above
    schema: any,
    path: string,
    config?: BuilderGeneratorConfig,
  ) => unknown;
};

export type SchemaGenerator<SchemaType extends $ZodType> = {
  match: SchemaMatcher<SchemaType>;
  generate: (
    schema: SchemaType,
    path: string,
    config?: BuilderGeneratorConfig,
  ) => z.infer<SchemaType>;
};

export type BuilderGeneratorConfig = {
  generators?: LooseSchemaGenerator[];
  paths?: {
    path: string;
    // biome-ignore lint/suspicious/noExplicitAny: user-defined override, can be anything
    generate: (config?: BuilderGeneratorConfig) => any;
  }[];
};
