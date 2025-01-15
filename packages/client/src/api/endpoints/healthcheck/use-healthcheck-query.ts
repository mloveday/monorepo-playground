import { api } from "@/api/api";

// allows for simpler mocking for unit (not integration) tests, and for cleaner components
export const useHealthcheckQuery = api.endpoints.getHealthCheck.useQuery;
