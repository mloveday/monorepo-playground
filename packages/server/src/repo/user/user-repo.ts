import { getPrisma } from "@repo/db";
import type { ServerUser } from "@repo/server/models/user/server-user.ts";

export const getOrCreateUser = async (user: ServerUser) => {
  const existing = await getPrisma().user.findUnique({
    where: { sub: user.sub },
  });
  if (existing) return existing;
  return getPrisma().user.create({
    data: {
      sub: user.sub,
      email: user.email,
      name: user.name,
    },
  });
};
