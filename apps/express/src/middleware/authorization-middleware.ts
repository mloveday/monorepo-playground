import type { ServerUser } from "@repo/server/models/user/server-user.ts";
import type { RequestHandler, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { z } from "zod/v4";

const authHeaderSchema = z.string().startsWith("Bearer ").optional();

const JWKS = createRemoteJWKSet(
  new URL("http://idp:7080/realms/local-demo/protocol/openid-connect/certs"),
);

type AuthorizationOptions = {
  optional?: boolean; // defaults to required
};

export const authorizationMiddleware =
  (options?: AuthorizationOptions): RequestHandler =>
  async (req, res, next) => {
    const authHeader = authHeaderSchema.parse(req.header("Authorization"));
    if (authHeader === undefined) {
      if (!options?.optional) {
        console.error("No authorization header provided");
        res.sendStatus(403);
        return;
      }
      next();
      return;
    }
    const token = authHeader.slice(7);
    try {
      const verifiedJwt = await jwtVerify(token, JWKS);
      res.locals.auth = verifiedJwt.payload;
    } catch (e) {
      if (!options?.optional) {
        console.error("Failed to verify token", e);
        res.sendStatus(403);
        return;
      }
    }
    next();
  };

export const getServerUserFromResponse = (res: Response): ServerUser => ({
  sub: res.locals.auth.sub,
  name: res.locals.auth.name,
  email: res.locals.auth.email,
});
