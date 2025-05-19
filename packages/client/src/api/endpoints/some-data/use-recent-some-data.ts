import { api } from "@repo/client/api/api.ts";

export const useRecentSomeData = api.endpoints.getRecentSomeData.useQuery;
