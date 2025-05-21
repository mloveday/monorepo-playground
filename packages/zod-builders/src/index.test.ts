import { generateBuilderFromSchema } from "@repo/lib/index.ts";
import { describe, expect, it } from "vitest";
import { z } from "zod/v4";

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
      bigint: expect.any(BigInt),
      undefined: undefined,
      optional: undefined,
      null: null,
      nullable: null,
    });
    console.log(builder.build());
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
    console.log(builder.build());
  });

  it("should handle pipes and transforms", () => {
    const testSchema = z.object({
      pipe: z.string().pipe(z.string().min(5)),
      transform: z.string().transform((v) => v.length),
    });

    const builder = generateBuilderFromSchema(testSchema);

    expect(builder.build()).toEqual({
      pipe: expect.any(String),
      transform: expect.any(Number), // transform gets input string's length
    });
    console.log(builder.build());
  });
});
