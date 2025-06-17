import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { keycloak } from "@repo/client/state/keycloack-auth.ts";

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: async (headers) => {
    if (keycloak.authenticated) {
      await keycloak.updateToken();
      headers.set("Authorization", `Bearer ${keycloak.token}`);
    }
  },
});

export const javaApiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8081",
  prepareHeaders: async (headers) => {
    if (keycloak.authenticated) {
      await keycloak.updateToken();
      headers.set("Authorization", `Bearer ${keycloak.token}`);
    }
  },
});
