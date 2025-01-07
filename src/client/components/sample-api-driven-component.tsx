import React, { PropsWithChildren } from "react";

import { useHealthcheckQuery } from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import { withApiData } from "@/client/components/common/api/with-api-data";
import { buttonStyles } from "@/client/components/common/button";

const Content = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-4">
    <h2 className="font-bold text-2xl">Load sample API endpoint data</h2>
    <div className="grid grid-cols-3 gap-4 align-middle h-20 border p-4 w-full rounded-md">
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

export const SampleApiDrivenComponent = withApiData(
  ({ apiResult }) => (
    <Content>
      <GridItemCentred>{apiResult.data.message}</GridItemCentred>
      <GridItemCentred>
        <button
          className={buttonStyles}
          disabled={apiResult.isFetching}
          onClick={apiResult.refetch}
        >
          Reload
        </button>
      </GridItemCentred>
      {apiResult.isFetching && <GridItemCentred>fetching</GridItemCentred>}
    </Content>
  ),
  Wrapper,
  useHealthcheckQuery,
  () => ({ forceSucceed: true }),
  "SampleApiDrivenComponent",
);
