import {PropsWithChildren} from "react";

import {useHealthcheckQuery} from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import {buttonStyles} from "@/client/components/common/button";

const Content = ({children}: PropsWithChildren) => (
  <div className="flex flex-col gap-4">
    <h2 className="font-bold text-2xl">Load sample API endpoint data</h2>
    <div className="grid grid-cols-3 gap-4 align-middle h-20 border p-4 w-full rounded-md">
      {children}
    </div>
  </div>
);

const GridItemCentred = ({children}: PropsWithChildren) => (
  <div className="self-center justify-self-center">
    {children}
  </div>
);

export const SampleApiDrivenComponent = () => {
  // NB: do not directly call API from component
  const healthcheck = useHealthcheckQuery();

  if (healthcheck.isError) return <Content><GridItemCentred>error</GridItemCentred></Content>;
  if (healthcheck.isLoading) return <Content><GridItemCentred>loading</GridItemCentred></Content>;
  if (healthcheck.isUninitialized) return <Content><GridItemCentred>...</GridItemCentred></Content>;
  return <Content>
    <GridItemCentred>
      {healthcheck.data.message}
    </GridItemCentred>
    <GridItemCentred>
      <button
        className={buttonStyles}
        disabled={healthcheck.isFetching}
        onClick={healthcheck.refetch}
      >
        Reload
      </button>
    </GridItemCentred>
    {healthcheck.isFetching && <GridItemCentred>fetching</GridItemCentred>}
  </Content>
    ;
};