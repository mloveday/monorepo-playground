import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {FormError} from "@/client/components/common/form-error";

describe('FormError', () => {
  it('should return a tick when error is undefined', () => {
    const result = render(<FormError />)

    expect(result.getByText("✅")).not.toBeNull();
  });

  it('should return a tick when error is null', () => {
    // @ts-expect-error This tests a value that should not be provided
    const result = render(<FormError error={null} />)

    expect(result.getByText("✅")).not.toBeNull();
  });

  it('should return the error when present', () => {
    const error = "Some field error message";

    const result = render(<FormError error={error} />)

    expect(result.getByText(error)).not.toBeNull();
  });

  it('should return an empty element when an empty string provided', () => {
    const error = "";

    const result = render(<FormError error={error} />)

    const firstChild = result.container.firstChild;
    expect(firstChild).not.toBeNull();
    expect(firstChild!.textContent).toBe("");
  });
});