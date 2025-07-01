import { useHealthcheckQuery } from "@repo/client/api/endpoints/healthcheck/use-healthcheck-query.ts";
import type { ApiBaseQuery } from "@repo/client/api/express-api-base-query.ts";
import { withApiData } from "@repo/client/components/common/api/with-api-data.tsx";
import { withStore } from "@repo/client/test/with-store.tsx";
import type { HealthCheckRequest } from "@repo/schemas/api/healthcheck/health-check-request.ts";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response.ts";
import { withLatency } from "@repo/test/api/mock-handlers.ts";
import { server } from "@repo/test/api/setup-server.ts";
import { testRender } from "@repo/test/test-render.ts";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type React from "react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

describe("withApiData", () => {
  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
    <div>
      <span>wrapper</span>
      <div>{children}</div>
    </div>
  );

  const Component = withApiData<
    HealthCheckResponse,
    HealthCheckRequest,
    ApiBaseQuery,
    PropsWithChildren
  >(
    (props) => (
      <div>
        <span>child</span>
        <div>{props.apiResult.data.message}</div>
      </div>
    ),
    Wrapper,
    useHealthcheckQuery,
    () => ({ forceSucceed: true }),
  );
  const TestComponent = withStore(Component);

  it("should render ApiLoading when loading", async () => {
    server.use(
      http.get(
        "http://localhost:3001/healthcheck",
        withLatency(() =>
          HttpResponse.json({
            success: true,
            message: "good healthcheck response",
          }),
        ),
      ),
    );

    const result = testRender(<TestComponent />);

    expect(result.getByText("wrapper")).not.toBeNull();
    expect(result.getByText("loading")).not.toBeNull();
    await waitFor(() => expect(result.getByText("child")).not.toBeNull());
    expect(result.getByText("good healthcheck response")).not.toBeNull();
  });

  it("should render ApiError when error", async () => {
    server.use(
      http.get("http://localhost:3001/healthcheck", HttpResponse.error),
    );

    const result = testRender(<TestComponent />);

    expect(result.getByText("wrapper")).not.toBeNull();
    expect(result.getByText("loading")).not.toBeNull();

    await waitFor(() => expect(result.getByText("error")).not.toBeNull());
    // we do not render the component if there is an error
    expect(result.getByText("wrapper")).not.toBeNull();
  });
});
