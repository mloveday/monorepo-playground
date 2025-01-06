import {api} from "@/client/api/api";

export const useHealthcheckQuery = () => api.endpoints.getHealthCheck.useQuery(undefined);