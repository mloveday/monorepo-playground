import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://idp:7080",
  realm: "local-demo",
  clientId: "java-demo",
});

export const getKeycloakInstance = () => keycloak;
