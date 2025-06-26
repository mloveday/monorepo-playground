import type { UserViewModel } from "@repo/schemas/api/user/user-view-model.ts";

export type ServerUser = Omit<UserViewModel, "provider"> & {
  email: string;
};
