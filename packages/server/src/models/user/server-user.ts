import type { UserViewModel } from "@repo/schemas/api/user/user-schema.ts";

export type ServerUser = Omit<UserViewModel, "provider"> & {
  email: string;
};
