import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";

import { HealthCheckContent } from "@/client/components/healthcheck/health-check-content";
import { noop } from "@/lib/no-op";
import { withLatency } from "@/test/api/mock-handlers";
import { server } from "@/test/api/setup-server";
import { testRender } from "@/test/test-render";
import { withStore } from "@/test/with-store";

describe("HealthCheckContent", () => {
  const Component = withStore(HealthCheckContent);

  beforeEach(() => {
    server.use(
      http.get(
        "/api/healthcheck",
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
    await userEvent.click(role);

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
    await userEvent.click(role);

    await waitFor(() => expect(result.getByText("fetching")).not.toBeNull());
    await waitFor(() =>
      expect(result.getByText("bad healthcheck response")).not.toBeNull(),
    );
    await waitFor(() => expect(result.queryByText("fetching")).toBeNull());
  });
});
