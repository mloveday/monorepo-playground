import type { User } from "@repo/db";
import type { UserViewModel } from "@repo/schemas/api/board/board-thread.ts";

export const userToResponse = (user: User): UserViewModel => ({
  provider: "keycloak",
  sub: user.sub,
  name: user.name,
});
