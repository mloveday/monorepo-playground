import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://localhost:7080",
  realm: "local-demo",
  clientId: "java-demo",
});

export const keycloakInit = keycloak.init();
