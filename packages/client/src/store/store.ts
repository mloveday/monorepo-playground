import { configureStore } from "@reduxjs/toolkit";
import { api, javaApi } from "@repo/client/api/api.ts";
import { useDispatch, useSelector } from "react-redux";
import { keycloakSlice } from "@repo/client/state/keycloak-auth.ts";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [javaApi.reducerPath]: javaApi.reducer,
      [keycloakSlice.reducerPath]: keycloakSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, javaApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

// NB: do not call these hooks directly in components, there should be some kind of service between the state and the component
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
