import { describe, expect, it } from "vitest";

import { isDefined } from "@/equality-checks";

describe("equality-checks", () => {
  describe("isDefined", () => {
    const trueCases: [string, unknown][] = [
      ["object", {}],
      ["array", []],
      ["string", ""],
      ["zero", 0],
      ["one", 1],
      ["NaN", Number.NaN],
      ["true", true],
      ["false", false],
    ];
    it.each(trueCases)("should return true for %s", (_, value) => {
      expect(isDefined(value)).toBe(true);
    });

    const falseCases: [string, unknown][] = [
      ["undefined", undefined],
      ["null", null],
    ];
    it.each(falseCases)("should return false for %s", (_, value) => {
      expect(isDefined(value)).toBe(false);
    });
  });
});
