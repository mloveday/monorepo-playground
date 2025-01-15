import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type React from "react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import type { ApiBaseQuery } from "@/api/api-types";
import { useHealthcheckQuery } from "@/api/endpoints/healthcheck/use-healthcheck-query";
import { withApiData } from "@/components/common/api/with-api-data";
import { withStore } from "@/test/with-store";
import type { HealthCheckRequest } from "@repo/schemas/api/healthcheck/health-check-request";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response";
import { withLatency } from "@repo/test/api/mock-handlers";
import { server } from "@repo/test/api/setup-server";
import { testRender } from "@repo/test/test-render";

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
        "/api/healthcheck",
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
    server.use(http.get("/api/healthcheck", HttpResponse.error));

    const result = testRender(<TestComponent />);

    expect(result.getByText("wrapper")).not.toBeNull();
    expect(result.getByText("loading")).not.toBeNull();

    await waitFor(() => expect(result.getByText("error")).not.toBeNull());
    // we do not render the component if there is an error
    expect(result.getByText("wrapper")).not.toBeNull();
  });
});
