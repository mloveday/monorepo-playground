import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("/", () => {
  describe("Home", () => {
    it("should render a title and sample components", () => {
      const result = render(<Home />);

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
