import { generateBuilderFromSchema } from "@repo/zod-builders/index.ts";
import type { SchemaGenerator } from "@repo/zod-builders/types.ts";
import { describe, expect, it } from "vitest";
import { z } from "zod/v4";
import type { $ZodCustom } from "zod/v4/core";

describe("zod-builder", () => {
  it("should create a builder with values for basic datatypes", () => {
    const testSchema = z.object({
      array: z.object({ foo: z.string() }).array(),
      string: z.string(),
      boolean: z.boolean(),
      number: z.number(),
      object: z.object({
        bar: z.number(),
      }),
      uuid: z.uuid(),
      dateTimeString: z.iso.datetime(),
      bigint: z.bigint(),
      undefined: z.undefined(),
      null: z.null(),
      optional: z.string().optional(),
      nullable: z.string().nullable(),
    });

    const builder = generateBuilderFromSchema(testSchema);

    expect(builder.build()).toEqual({
      array: expect.arrayContaining(
        Array.from({ length: 5 }).map(() => ({ foo: expect.any(String) })),
      ),
      string: expect.any(String),
      boolean: expect.any(Boolean),
      number: expect.any(Number),
      object: {
        bar: expect.any(Number),
      },
      uuid: expect.any(String),
      dateTimeString: expect.any(String),
      bigint: expect.any(BigInt),
      undefined: undefined,
      optional: undefined,
      null: null,
      nullable: null,
    });

    builder
      .withArray([{ foo: "bar" }])
      .withString("some-string")
      .withBoolean(false)
      .withNumber(10)
      .withObject({ bar: 42 })
      .withUuid("7f6b3a97-956b-48d2-8d51-fe6f12925e9f")
      .withDateTimeString("2025-06-25T12:54:16.116Z")
      .withBigint(BigInt(5))
      .withOptional("defined")
      .withNullable("not null");

    expect(builder.build()).toEqual({
      array: [{ foo: "bar" }],
      string: "some-string",
      boolean: false,
      number: 10,
      object: { bar: 42 },
      uuid: "7f6b3a97-956b-48d2-8d51-fe6f12925e9f",
      dateTimeString: "2025-06-25T12:54:16.116Z",
      bigint: BigInt(5),
      undefined: undefined,
      optional: "defined",
      null: null,
      nullable: "not null",
    });
  });

  it("should handle coercion", () => {
    const testSchema = z.object({
      string: z.coerce.string(),
      boolean: z.coerce.boolean(),
      number: z.coerce.number(),
      bigint: z.coerce.bigint(),
    });

    const builder = generateBuilderFromSchema(testSchema);

    expect(builder.build()).toEqual({
      string: expect.any(String),
      boolean: expect.any(Boolean),
      number: expect.any(Number),
      bigint: expect.any(BigInt),
    });

    builder
      .withString("some-string")
      .withBoolean(false)
      .withNumber(10)
      .withBigint(BigInt(5));

    expect(builder.build()).toEqual({
      string: "some-string",
      boolean: false,
      number: 10,
      bigint: BigInt(5),
    });
  });

  it("should handle pipes, transforms, refinements & custom schemas", () => {
    const testSchema = z.object({
      pipe: z.string().pipe(z.string().min(5)),
      refineString: z.string().check(() => {}),
      refineNumber: z.number().check(() => {}),
      transform: z.string().transform((v) => v.length),
      custom: z.custom(() => true),
    });

    const customGenerator = {
      match: (schema): schema is $ZodCustom =>
        schema === testSchema.def.shape.custom,
      generate: () => "yoyoyoyo!",
    } satisfies SchemaGenerator<$ZodCustom>;

    const builder = generateBuilderFromSchema(testSchema, {
      generators: [customGenerator],
    });

    expect(builder.build()).toEqual({
      pipe: expect.any(String),
      refineString: expect.any(String),
      refineNumber: expect.any(Number),
      transform: expect.any(Number), // transform gets input string's length
      custom: "yoyoyoyo!",
    });

    builder
      .withPipe("pipe")
      .withRefineString("refine-string")
      .withRefineNumber(10)
      .withTransform(1)
      .withCustom("some-custom");

    expect(builder.build()).toEqual({
      pipe: "pipe",
      refineString: "refine-string",
      refineNumber: 10,
      transform: 1,
      custom: "some-custom",
    });
  });

  it("should handle circular references and other overrides with a paths override", () => {
    const schema = z.object({
      id: z.int(),
      get children() {
        return schema.array();
      },
    });

    const builder = generateBuilderFromSchema(schema, {
      paths: [
        {
          // overrides the children of nested objects with an empty array
          path: "$.children.children",
          generate: () => [],
        },
      ],
    });

    const childExpect = {
      id: expect.any(Number),
      children: [],
    };
    expect(builder.build()).toEqual({
      id: expect.any(Number),
      children: [
        childExpect,
        childExpect,
        childExpect,
        childExpect,
        childExpect,
      ],
    });
  });

  it("should throw an error for an unknown zod schema", () => {
    const schema = z.object({ unknown: z.unknown() });
    const builder = generateBuilderFromSchema(schema);

    expect(() => builder.build()).toThrow("schema not known: unknown");
  });

  it("should handle an empty string for a property", () => {
    const schema = z.object({ "": z.string() });
    const builder = generateBuilderFromSchema(schema);

    expect(builder.build()).toEqual({ "": expect.any(String) });

    expect(builder.with("foo").build()).toEqual({ "": "foo" });
  });
});
