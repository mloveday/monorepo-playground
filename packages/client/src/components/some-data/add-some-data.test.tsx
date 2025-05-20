import { usePostSomeData } from "@repo/client/api/endpoints/some-data/use-post-some-data.ts";
import { AddSomeData } from "@repo/client/components/some-data/add-some-data.ts";
import { testRender } from "@repo/test/test-render.ts";
import { describe, expect, it, vi } from "vitest";

vi.mock("@repo/client/api/endpoints/some-data/use-post-some-data.ts");

describe("add-some-data", () => {
  // TODO: refactor the component to not include the error message in the input name
  const inputNameWhenValid = "Message ✅";
  const inputNameWhenInvalid =
    "Message String must contain at least 2 character(s)";
  const buttonName = "Add SomeData";

  it("should add some data via an API call when valid then reset the input", async () => {
    const postSomeData = vi.fn();
    vi.mocked(usePostSomeData).mockReturnValue([
      postSomeData,
      { reset: vi.fn() },
    ]);
    const result = testRender(<AddSomeData />);

    expect(
      result.getByRole("textbox", { name: inputNameWhenValid }),
    ).not.toBeNull();
    expect(result.getByRole("button", { name: buttonName })).not.toBeNull();

    await result.user.type(
      result.getByRole("textbox", { name: inputNameWhenValid }),
      "New message",
    );
    expect(
      (
        result.getByRole("textbox", {
          name: inputNameWhenValid,
        }) as HTMLInputElement
      ).value,
    ).toEqual("New message");

    await result.user.click(result.getByRole("button", { name: buttonName }));

    expect(
      (
        result.getByRole("textbox", {
          name: inputNameWhenValid,
        }) as HTMLInputElement
      ).value,
    ).toEqual("");

    expect(postSomeData).toHaveBeenCalledWith({ message: "New message" });
  });

  it("should show an error and prevent submitting when invalid", async () => {
    const postSomeData = vi.fn();
    vi.mocked(usePostSomeData).mockReturnValue([
      postSomeData,
      { reset: vi.fn() },
    ]);
    const result = testRender(<AddSomeData />);

    expect(
      result.getByRole("textbox", { name: inputNameWhenValid }),
    ).not.toBeNull();
    expect(result.getByRole("button", { name: buttonName })).not.toBeNull();

    await result.user.click(result.getByRole("button", { name: buttonName }));

    expect(
      result.getByRole("textbox", {
        name: inputNameWhenInvalid,
      }),
    ).not.toBeNull();

    expect(postSomeData).not.toHaveBeenCalled();
  });
});
