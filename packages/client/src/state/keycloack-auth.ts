import Keycloak from "keycloak-js";
import {
  createAsyncThunk,
  createSlice,
  type GetThunkAPI,
} from "@reduxjs/toolkit";
import { useAppSelector } from "@repo/client/store/store.ts";

export const keycloak = new Keycloak({
  url: "http://localhost:7080",
  realm: "local-demo",
  clientId: "java-demo",
});

type AuthenticatedState = { authenticated: boolean };

export type KeycloakState =
  | {
      state: "idle" | "error";
    }
  | {
      state: "loading";
      requestId: string;
    }
  | ({ state: "done" } & AuthenticatedState);

const initialState = {
  state: "idle",
} satisfies KeycloakState;

type AsyncThunkConfig = {
  state: { keycloak: KeycloakState };
};

export const initAuth = createAsyncThunk(
  "keycloak/init",
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    const state = thunkAPI.getState();
    if (
      state.keycloak.state === "loading" &&
      state.keycloak.requestId !== thunkAPI.requestId
    )
      return;
    return keycloak.init({ onLoad: "check-sso" });
  },
);

export const keycloakSlice = createSlice({
  name: "keycloak",
  initialState: initialState as KeycloakState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(initAuth.pending, (state, action) =>
      state.state !== "loading"
        ? {
            state: "loading",
            requestId: action.meta.requestId,
          }
        : state,
    );

    builder.addCase(initAuth.fulfilled, (state, action) =>
      action.payload !== undefined
        ? {
            authenticated: action.payload,
            state: "done",
          }
        : state,
    );

    builder.addCase(initAuth.rejected, () => ({
      state: "error",
    }));
  },
});

const useKeycloakState = () => useAppSelector((s) => s.keycloak);

export const useIsAuthenticated = () => {
  const keycloakState = useKeycloakState();
  return keycloakState.state === "done" && keycloakState.authenticated;
};

export const useIsAuthenticationStatusKnown = () => {
  const keycloakState = useKeycloakState();
  return keycloakState.state === "done";
};
