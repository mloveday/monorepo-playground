import type { ApiBaseQuery } from "@repo/client/api/api-types.ts";
import { useRecentSomeData } from "@repo/client/api/endpoints/some-data/use-recent-some-data.ts";
import { withApiData } from "@repo/client/components/common/api/with-api-data.tsx";
import type { GetRecentSomeDataRequest } from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.ts";
import type { GetRecentSomeDataResponse } from "@repo/schemas/api/some-data/get-recent-some-data-response-schema.ts";
import type React from "react";
import type { PropsWithChildren } from "react";

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div>
    <h2>Recent SomeData</h2>
    {children}
  </div>
);

export const RecentSomeData = withApiData<
  GetRecentSomeDataResponse,
  GetRecentSomeDataRequest,
  ApiBaseQuery,
  object
>(
  (props) => (
    <Wrapper>
      {props.apiResult.data.length === 0 && (
        <span>No recent SomeData found!</span>
      )}
      {props.apiResult.data.length > 0 && (
        <ul>
          {props.apiResult.data.map((v) => (
            <li key={v.id}>{v.message}</li>
          ))}
        </ul>
      )}
    </Wrapper>
  ),
  Wrapper,
  useRecentSomeData,
  () => ({ count: 15 }),
  "RecentSomeData",
);
