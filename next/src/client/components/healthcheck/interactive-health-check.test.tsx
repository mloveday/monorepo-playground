import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { InteractiveHealthCheck } from "@/client/components/healthcheck/interactive-health-check";
import { withStore } from "@/test/with-store";

describe("InteractiveHealthCheck", () => {
  const Component = withStore(InteractiveHealthCheck);

  const name = "Force API success";
  it("should default to success and be user-changeable", async () => {
    const result = render(<Component />);

    await waitFor(() =>
      expect(
        result.getByRole("checkbox", { name, checked: true }),
      ).not.toBeNull(),
    );

    await userEvent.click(result.getByRole("checkbox", { name: name }));

    await waitFor(() =>
      expect(
        result.getByRole("checkbox", { name, checked: false }),
      ).not.toBeNull(),
    );
  });
});
