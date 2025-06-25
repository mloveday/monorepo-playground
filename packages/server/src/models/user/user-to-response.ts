import type { User } from "@repo/db";

import type { UserViewModel } from "@repo/schemas/api/user/user-schema.ts";

export const userToResponse = (user: User): UserViewModel => ({
  provider: "keycloak",
  sub: user.sub,
  name: user.name,
});
