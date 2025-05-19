import { HealthCheckContent } from "@repo/client/components/healthcheck/health-check-content.tsx";
import { withStore } from "@repo/client/test/with-store.tsx";
import { noop } from "@repo/lib/no-op.ts";
import { withLatency } from "@repo/test/api/mock-handlers.ts";
import { server } from "@repo/test/api/setup-server.ts";
import { testRender } from "@repo/test/test-render.ts";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";

describe("HealthCheckContent", () => {
  const Component = withStore(HealthCheckContent);

  beforeEach(() => {
    server.use(
      http.get(
        "http://localhost:3001/api/healthcheck",
        withLatency(({ request }) => {
          const forceSucceed =
            new URL(request.url).searchParams.get("forceSucceed") === "true";
          return HttpResponse.json({
            success: forceSucceed,
            message: forceSucceed
              ? "good healthcheck response"
              : "bad healthcheck response",
          });
        }),
      ),
    );
  });

  it("should fetch data and display a good result", async () => {
    const result = testRender(
      <Component forceSucceed setForceSucceed={noop} />,
    );

    await waitFor(() =>
      expect(result.getByText("good healthcheck response")).not.toBeNull(),
    );

    const role = result.getByRole("button", { name: "Reload" });
    expect(role).not.toBeNull();
    await result.user.click(role);

    await waitFor(() => expect(result.getByText("fetching")).not.toBeNull());
    await waitFor(() =>
      expect(result.getByText("good healthcheck response")).not.toBeNull(),
    );
    await waitFor(() => expect(result.queryByText("fetching")).toBeNull());
  });

  it("should fetch data and display a bad result", async () => {
    const result = testRender(<Component setForceSucceed={noop} />);

    await waitFor(() =>
      expect(result.getByText("bad healthcheck response")).not.toBeNull(),
    );

    const role = result.getByRole("button", { name: "Reload" });
    expect(role).not.toBeNull();
    await result.user.click(role);

    await waitFor(() => expect(result.getByText("fetching")).not.toBeNull());
    await waitFor(() =>
      expect(result.getByText("bad healthcheck response")).not.toBeNull(),
    );
    await waitFor(() => expect(result.queryByText("fetching")).toBeNull());
  });
});
