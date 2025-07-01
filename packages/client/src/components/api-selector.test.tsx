import { ApiSelector } from "@repo/client/components/api-selector.tsx";
import { withStore } from "@repo/client/test/with-store.tsx";
import { testRender } from "@repo/test/test-render.ts";
import { describe, expect, it } from "vitest";

describe("ApiSelector", () => {
  it("should switch between APIs", async () => {
    const TestComponent = withStore(ApiSelector);

    const result = testRender(<TestComponent />);

    expect(
      (
        (await result.getByRole("radio", {
          name: "Express",
        })) as HTMLInputElement
      ).checked,
    ).toBe(true);
    expect(
      ((await result.getByRole("radio", { name: "Java" })) as HTMLInputElement)
        .checked,
    ).toBe(false);

    await result.user.click(await result.getByRole("radio", { name: "Java" }));

    expect(
      (
        (await result.getByRole("radio", {
          name: "Express",
        })) as HTMLInputElement
      ).checked,
    ).toBe(false);
    expect(
      ((await result.getByRole("radio", { name: "Java" })) as HTMLInputElement)
        .checked,
    ).toBe(true);

    await result.user.click(
      await result.getByRole("radio", { name: "Express" }),
    );

    expect(
      (
        (await result.getByRole("radio", {
          name: "Express",
        })) as HTMLInputElement
      ).checked,
    ).toBe(true);
    expect(
      ((await result.getByRole("radio", { name: "Java" })) as HTMLInputElement)
        .checked,
    ).toBe(false);
  });
});
