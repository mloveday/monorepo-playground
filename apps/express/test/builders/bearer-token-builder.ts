import { UnsecuredJWT } from "jose/jwt/unsecured";

export const bearerTokenBuilder = (payload?: {
  sub: string;
  name: string;
  email: string;
}) =>
  new UnsecuredJWT({
    sub: "abc123",
    name: "Some Name",
    email: "someone@example.com",
    ...payload,
  })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .encode();
