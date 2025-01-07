import {
  BaseQueryFn,
  QueryArgFrom,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import {
  type TypedUseQuery,
  TypedUseQueryHookResult,
} from "@reduxjs/toolkit/query/react";
import React, { PropsWithChildren } from "react";

import { ApiError } from "@/client/components/common/api/api-error";
import { ApiLoading } from "@/client/components/common/api/api-loading"; // when we pass data to the component, it will only receive the case where isSuccess is true

// when we pass data to the component, it will only receive the case where isSuccess is true
// this is cribbed from the RTK TypedUseQueryHookResult definition - update this if that is updated
type PassedApiResult<
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

export const withApiData = <
  ResultType,
  QueryArg extends Record<keyof Props, unknown>,
  BaseQuery extends BaseQueryFn,
  Props extends PropsWithChildren = object,
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
          <ApiError />
        </Wrapper>
      );
    if (apiResult.isLoading)
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
