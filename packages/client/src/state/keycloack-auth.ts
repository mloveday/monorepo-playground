import Keycloak from "keycloak-js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "@repo/client/store/store.ts";

export const keycloak = new Keycloak({
  url: "http://localhost:7080",
  realm: "local-demo",
  clientId: "java-demo",
});

type AuthenticatedState = { authenticated: boolean };

export type KeycloakState =
  | {
      state: "empty" | "loading" | "error";
    }
  | ({ state: "done" } & AuthenticatedState);

const initialState = {
  state: "empty",
} satisfies KeycloakState;

export const initAuth = createAsyncThunk("keycloak/init", async () =>
  keycloak.init(),
);

export const keycloakSlice = createSlice({
  name: "keycloak",
  initialState: initialState as KeycloakState,
  reducers: {
    reset: () => initialState,
    init: () => ({ state: "loading" }) satisfies KeycloakState,
  },
  extraReducers: (builder) => {
    builder.addCase(initAuth.fulfilled, (_, action) => ({
      authenticated: action.payload,
      state: "done",
    }));
    builder.addCase(initAuth.rejected, () => ({
      state: "error",
    }));
  },
});

export const useIsAuthenticated = () => {
  const keycloakState = useAppSelector((s) => s.keycloak);
  return keycloakState.state === "done" && keycloakState.authenticated;
};
