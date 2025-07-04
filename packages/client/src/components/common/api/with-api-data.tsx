import type {
  BaseQueryFn,
  QueryArgFrom,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import type {
  TypedUseQuery,
  TypedUseQueryHookResult,
} from "@reduxjs/toolkit/query/react";
import { ApiError } from "@repo/client/components/common/api/api-error.tsx";
import { ApiLoading } from "@repo/client/components/common/api/api-loading.tsx"; // when we pass data to the component, it will only receive the case where isSuccess is true
import type React from "react";
import type { PropsWithChildren } from "react";

// when we pass data to the component, it will only receive the case where isSuccess is true
// this is cribbed from the RTK TypedUseQueryHookResult definition - update this if that is updated
export type PassedApiResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery> &
  (
    | ({
        isSuccess: true;
        isFetching: true;
        error: undefined;
      } & Required<
        Pick<
          TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery>,
          "data" | "fulfilledTimeStamp"
        >
      >)
    | ({
        isSuccess: true;
        isFetching: false;
        error: undefined;
      } & Required<
        Pick<
          TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery>,
          "data" | "fulfilledTimeStamp" | "currentData"
        >
      >)
  );

// note that this is only useful for uni-directional data flow.
// this will not be useful if the child component wants to update the query
export const withApiData = <
  ResultType,
  QueryArg extends object,
  BaseQuery extends BaseQueryFn,
  Props extends PropsWithChildren,
>(
  Component: React.FC<
    Props & {
      apiResult: PassedApiResult<ResultType, QueryArg, BaseQuery>;
    }
  >,
  Wrapper: React.FC<PropsWithChildren>,
  useApiData: TypedUseQuery<ResultType, QueryArg, BaseQuery>,
  getArgs: (
    props: Props,
  ) => QueryArgFrom<QueryDefinition<QueryArg, BaseQuery, string, ResultType>>,
  componentName?: string,
): React.FC<Props> => {
  const Wrapped: React.FC<Props> = (props) => {
    const apiResult = useApiData(getArgs(props));

    if (apiResult.isError)
      return (
        <Wrapper>
          <ApiError retry={() => apiResult.refetch()} />
        </Wrapper>
      );
    if (apiResult.isLoading || apiResult.isFetching)
      return (
        <Wrapper>
          <ApiLoading />
        </Wrapper>
      );
    // istanbul ignore next -- @preserve
    if (apiResult.isUninitialized) return <Wrapper />;

    return (
      <Component {...props} apiResult={apiResult}>
        {props.children}
      </Component>
    );
  };
  Wrapped.displayName = `WithApiData_${Component.displayName ?? componentName ?? "Unknown"}`;
  return Wrapped;
};

export const NoWrapper = (({ children }) => (
  <>{children}</>
)) satisfies React.FC<PropsWithChildren>;

export const noQueryProps = () => ({});
