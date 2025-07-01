import { useApi } from "@repo/client/api/use-api.ts";

export const useCreateBoardThread = () =>
  useApi().endpoints.createBoardThread.useMutation();
