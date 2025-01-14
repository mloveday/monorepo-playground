import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type React from "react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import { useHealthcheckQuery } from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import { withApiData } from "@/client/components/common/api/with-api-data";
import { withLatency } from "@/test/api/mock-handlers";
import { server } from "@/test/api/setup-server";
import { testRender } from "@/test/test-render";
import { withStore } from "@/test/with-store";

describe("withApiData", () => {
  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
    <div>
      <span>wrapper</span>
      <div>{children}</div>
    </div>
  );

  const Component = withStore(
    withApiData(
      ({ apiResult }) => (
        <div>
          <span>child</span>
          <div>{apiResult.data.message}</div>
        </div>
      ),
      Wrapper,
      useHealthcheckQuery,
      () => {},
    ),
  );

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

    const result = testRender(<Component />);

    expect(result.getByText("wrapper")).not.toBeNull();
    expect(result.getByText("loading")).not.toBeNull();
    await waitFor(() => expect(result.getByText("child")).not.toBeNull());
    expect(result.getByText("good healthcheck response")).not.toBeNull();
  });

  it("should render ApiError when error", async () => {
    server.use(http.get("/api/healthcheck", HttpResponse.error));

    const result = testRender(<Component />);

    expect(result.getByText("wrapper")).not.toBeNull();
    expect(result.getByText("loading")).not.toBeNull();

    await waitFor(() => expect(result.getByText("error")).not.toBeNull());
    // we do not render the component if there is an error
    expect(result.getByText("wrapper")).not.toBeNull();
  });
});
