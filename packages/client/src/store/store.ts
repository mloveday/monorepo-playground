import { configureStore } from "@reduxjs/toolkit";
import { expressApi, javaApi } from "@repo/client/api/api-definitions.ts";
import { apiSlice } from "@repo/client/state/api-slice.ts";
import { keycloakSlice } from "@repo/client/state/keycloak-auth.ts";
import { useDispatch, useSelector } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [expressApi.reducerPath]: expressApi.reducer,
      [javaApi.reducerPath]: javaApi.reducer,
      [keycloakSlice.reducerPath]: keycloakSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(expressApi.middleware, javaApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

// NB: do not call these hooks directly in components, there should be some kind of service between the state and the component
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
