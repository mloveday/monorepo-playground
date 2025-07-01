import { useApi } from "@repo/client/api/use-api.ts";

export const useCreateBoardMessage = () =>
  useApi().endpoints.createBoardMessage.useMutation();
