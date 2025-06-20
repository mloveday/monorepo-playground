import {
  type JWTVerifyResult,
  type ResolvedKey,
  UnsecuredJWT,
  type CryptoKey,
  type jwtVerify,
} from "jose";

export const jwtVerifyDecodeOnlyMock = ((jwt: string) => {
  const decoded = UnsecuredJWT.decode(jwt as string);
  return Promise.resolve({
    payload: decoded.payload,
    protectedHeader: { ...decoded.header, b64: true },
    key: {
      type: "public",
      algorithm: { name: "some-algorithm" },
      extractable: true,
      usages: [],
    } as CryptoKey,
  } as JWTVerifyResult & ResolvedKey);
}) as typeof jwtVerify;
