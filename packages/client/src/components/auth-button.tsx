import { keycloak, keycloakInit } from "@repo/client/state/keycloack-auth.ts";
import { useEffect } from "react";

export const AuthButton = () => {
  useEffect(() => {
    (async () => {
      try {
        const auth = await keycloakInit;
        console.log("authenticated", auth);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <button type="button" onClick={() => keycloak.login()}>
      Auth me
    </button>
  );
};
