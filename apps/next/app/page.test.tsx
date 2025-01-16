import Home from "@/app/page.tsx";
import { testRender } from "@repo/test/test-render.ts";
import { describe, expect, it } from "vitest";

describe("/", () => {
  describe("Home", () => {
    it("should render a title and sample components", () => {
      const result = testRender(<Home />);

      expect(result.getByRole("heading", { name: "HL POC" })).not.toBeNull();
      expect(
        result.getByRole("heading", { name: "Load sample API endpoint data" }),
      ).not.toBeNull();
      expect(
        result.getByRole("heading", { name: "Todo app with ephemeral state" }),
      ).not.toBeNull();
    });
  });
});
