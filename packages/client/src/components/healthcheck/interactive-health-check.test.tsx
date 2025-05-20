import { InteractiveHealthCheck } from "@repo/client/components/healthcheck/interactive-health-check.tsx";
import { withStore } from "@repo/client/test/with-store.tsx";
import { testRender } from "@repo/test/test-render.ts";
import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("InteractiveHealthCheck", () => {
  const Component = withStore(InteractiveHealthCheck);

  const name = "Force API success";
  it("should default to success and be user-changeable", async () => {
    const result = testRender(<Component />);

    await waitFor(() =>
      expect(
        result.getByRole("checkbox", { name, checked: true }),
      ).not.toBeNull(),
    );

    await result.user.click(result.getByRole("checkbox", { name: name }));

    await waitFor(() =>
      expect(
        result.getByRole("checkbox", { name, checked: false }),
      ).not.toBeNull(),
    );
  });
});
