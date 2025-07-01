import { expressApi } from "@repo/client/api/api-definitions.ts";

export const useHealthcheckQuery = expressApi.endpoints.getHealthCheck.useQuery;
