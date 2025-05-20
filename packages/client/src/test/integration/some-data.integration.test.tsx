import { AddSomeData } from "@repo/client/components/some-data/add-some-data.js";
import { RecentSomeData } from "@repo/client/components/some-data/recent-some-data.js";
import { server } from "@repo/test/api/setup-server.js";
import { buildSomeData } from "@repo/test/builders/some-data/build-some-data.js";
import { testRender } from "@repo/test/test-render.js";
import { waitFor } from "@testing-library/react";
import { http } from "msw";
import { describe, expect, it } from "vitest";
import { withStore } from "../with-store.tsx";

describe("some-data integration", () => {
  // TODO: refactor the component to not include the error message in the input name
  const inputNameWhenValid = "Message ✅";
  const buttonName = "Add SomeData";

  it("should reject a malformed response and show an error message", async () => {
    const TestComponent = withStore(() => (
      <>
        <RecentSomeData />
        <AddSomeData />
      </>
    ));

    server.use(
      http.get(
        "http://localhost:3001/api/some-data",
        () => new Response(JSON.stringify([{ not: "some data" }])),
      ),
    );

    const result = testRender(<TestComponent />);

    await waitFor(() => expect(result.getByText("error")).not.toBeNull());
  });

  it("should reject a 500 response and show an error message", async () => {
    const TestComponent = withStore(() => (
      <>
        <RecentSomeData />
        <AddSomeData />
      </>
    ));

    server.use(
      http.get("http://localhost:3001/api/some-data", () => Response.error()),
    );

    const result = testRender(<TestComponent />);

    await waitFor(() => expect(result.getByText("error")).not.toBeNull());
  });

  it("should show a message when no results found", async () => {
    const TestComponent = withStore(() => (
      <>
        <RecentSomeData />
        <AddSomeData />
      </>
    ));

    server.use(
      http.get(
        "http://localhost:3001/api/some-data",
        () => new Response(JSON.stringify([])),
      ),
    );

    const result = testRender(<TestComponent />);

    await waitFor(() =>
      expect(result.getByText("No recent SomeData found!")).not.toBeNull(),
    );
  });

  it("should fetch some data, allow adding data and refresh the list", async () => {
    const TestComponent = withStore(() => (
      <>
        <RecentSomeData />
        <AddSomeData />
      </>
    ));

    let dataAdded = false;
    server.use(
      http.get(
        "http://localhost:3001/api/some-data",
        () =>
          new Response(
            JSON.stringify(
              Array.from({ length: dataAdded ? 2 : 1 }).map(() =>
                buildSomeData(),
              ),
            ),
          ),
      ),
    );
    server.use(
      http.post("http://localhost:3001/api/some-data", () => {
        dataAdded = true;
        return new Response(JSON.stringify(buildSomeData()));
      }),
    );

    const result = testRender(<TestComponent />);

    // we should have one result
    expect(await result.findAllByRole("listitem")).toHaveLength(1);

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

    // we should now have two results
    expect(await result.findAllByRole("listitem")).toHaveLength(2);
  });
});
