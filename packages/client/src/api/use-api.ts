import { expressApi, javaApi } from "@repo/client/api/api-definitions.ts";
import { useAppSelector } from "@repo/client/store/store.ts";

const getApi = (selection: "express" | "java") => {
  switch (selection) {
    case "express":
      return expressApi;
    case "java":
      return javaApi;
    default:
      throw Error(`unknown api "${selection}"`);
  }
};

export const useApi = () => {
  const selection = useAppSelector((s) => s.apiSelection.api);
  return getApi(selection);
};
