import type { User } from "@repo/db";

import type { UserViewModel } from "@repo/schemas/api/user/user-view-model.ts";

export const userToViewModel = (user: User): UserViewModel => ({
  provider: "keycloak",
  sub: user.sub,
  name: user.name,
});
