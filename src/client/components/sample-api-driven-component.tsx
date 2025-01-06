import {useHealthcheckQuery} from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import {PropsWithChildren} from "react";

const Content = ({children}: PropsWithChildren) => (
  <div className="flex flex-col gap-4">
    <div>Load sample API endpoint data</div>
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
        className="border rounded py-2 px-4 bg-white disabled:text-gray-200 hover:disabled:bg-white hover:bg-amber-50 focus:outline-none focus:ring-amber-400 focus:ring"
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