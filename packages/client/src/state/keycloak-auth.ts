import {
  type GetThunkAPI,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";
import { useAppSelector } from "@repo/client/store/store.ts";

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
    return getKeycloakInstance().init({
      checkLoginIframe: false,
      flow: "standard",
      onLoad: "check-sso",
    });
  },
);

export const keycloakSlice = createSlice({
  name: "keycloak",
  initialState: initialState as KeycloakState,
  reducers: {
    setAuth: (_, action) => action.payload,
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

export const useIsAuthenticationError = () => {
  const keycloakState = useKeycloakState();
  return keycloakState.state === "error";
};
