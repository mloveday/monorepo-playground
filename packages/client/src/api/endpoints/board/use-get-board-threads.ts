import { useApi } from "@repo/client/api/use-api.ts";
import { useEffect } from "react";

export const useGetBoardThreads = () => {
  const api = useApi();
  // we must use a lazy query as we need to trigger the call when swapping APIs
  const [trigger, result] = api.endpoints.getBoardThreads.useLazyQuery({});
  useEffect(() => {
    trigger({});
  }, [trigger]);
  return result;
};
