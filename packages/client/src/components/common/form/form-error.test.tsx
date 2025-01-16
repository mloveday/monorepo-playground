import { FormError } from "@repo/client/components/common/form/form-error.tsx";
import { testRender } from "@repo/test/test-render.js";
import { describe, expect, it } from "vitest";

describe("FormError", () => {
  it("should return a tick when error is undefined", () => {
    const result = testRender(<FormError />);

    expect(result.getByText("✅")).not.toBeNull();
  });

  it("should return a tick when error is null", () => {
    // @ts-expect-error This tests a value that should not be provided
    const result = testRender(<FormError error={null} />);

    expect(result.getByText("✅")).not.toBeNull();
  });

  it("should return the error when present", () => {
    const error = "Some field error message";

    const result = testRender(<FormError error={error} />);

    expect(result.getByText(error)).not.toBeNull();
  });

  it("should return an empty element when an empty string provided", () => {
    const error = "";

    const result = testRender(<FormError error={error} />);

    const firstChild = result.container.firstChild;
    expect(firstChild).not.toBeNull();
    expect(firstChild?.textContent).toBe("");
  });
});
