import type React from "react";
import type { PropsWithChildren } from "react";

import type { ApiBaseQuery } from "@/client/api/api-types";
import { useHealthcheckQuery } from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import { withApiData } from "@/client/components/common/api/with-api-data";
import type { HealthCheckRequest } from "@/shared/api/healthcheck/health-check-request";
import type { HealthCheckResponse } from "@/shared/api/healthcheck/health-check-response";

const Content = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-4">
    <h2>Load sample API endpoint data</h2>
    <div className="box grid grid-cols-3 gap-4 align-middle h-40 w-full">
      {children}
    </div>
  </div>
);

const GridItemCentred = ({ children }: PropsWithChildren) => (
  <div className="self-center justify-self-center">{children}</div>
);

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <Content>
    <GridItemCentred>{children}</GridItemCentred>
  </Content>
);

type Props = PropsWithChildren & {
  forceSucceed?: boolean;
  setForceSucceed: (v: boolean) => void;
};

export const HealthCheckContent = withApiData<
  HealthCheckResponse,
  HealthCheckRequest,
  ApiBaseQuery,
  Props
>(
  (props) => (
    <Content>
      <label className="col-span-3 flex gap-4">
        <input
          type="checkbox"
          checked={props.forceSucceed}
          onChange={(ev) => props.setForceSucceed(ev.target.checked)}
        />
        <span className="self-center">Force API success</span>
      </label>
      <GridItemCentred>{props.apiResult.data.message}</GridItemCentred>
      <GridItemCentred>
        <button
          type="button"
          disabled={props.apiResult.isFetching}
          onClick={props.apiResult.refetch}
        >
          Reload
        </button>
      </GridItemCentred>
      {props.apiResult.isFetching && (
        <GridItemCentred>fetching</GridItemCentred>
      )}
    </Content>
  ),
  Wrapper,
  useHealthcheckQuery,
  ({ forceSucceed }) => ({ forceSucceed: forceSucceed ?? false }),
  "HealthCheckContent",
);
