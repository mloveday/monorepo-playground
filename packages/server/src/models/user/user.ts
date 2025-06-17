import type { UserViewModel } from "@repo/schemas/api/board/board-thread.ts";

export type ServerUser = UserViewModel & {
  email: string;
};
