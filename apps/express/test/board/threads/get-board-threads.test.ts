import { describe, expect, it } from "vitest";
import { bearerTokenBuilder } from "@/test/builders/bearer-token-builder.ts";
import supertest from "supertest";
import { app } from "@/src/app.ts";
import { persistThread } from "@/test/data/persist-thread.ts";
import { persistUser } from "@/test/data/persist-user.ts";
import { persistMessage } from "@/test/data/persist-message.ts";

describe("GET board/threads", () => {
  const testCases = [{ auth: "authenticated" }, { auth: "anonymous" }];

  it.each(testCases)(
    "should return threads with messages when user is $auth",
    async ({ auth }) => {
      const user = await persistUser();
      const thread = await persistThread(user);
      const parentMessage = await persistMessage(thread, user, {
        message: "parent message",
      });
      const childMessage = await persistMessage(thread, user, {
        parentMessage,
        message: "child message",
      });

      const response =
        auth === "authenticated"
          ? await supertest(app)
              .get("/board/threads")
              .set("Authorization", `Bearer ${bearerTokenBuilder(user)}`)
              .expect(200)
          : await supertest(app).get("/board/threads").expect(200);

      const expectedUser = {
        sub: user.sub,
        name: user.name,
        provider: "keycloak",
      };
      expect(response.body).toEqual([
        {
          id: thread.id,
          message: thread.message,
          title: thread.title,
          boardMessages: [
            {
              id: parentMessage.id,
              message: parentMessage.message,
              boardThreadId: thread.id,
              childMessages: [
                {
                  id: childMessage.id,
                  message: childMessage.message,
                  boardThreadId: thread.id,
                  parentMessageId: parentMessage.id,
                  childMessages: [],
                  createdAt: childMessage.createdAt.toISOString(),
                  updatedAt: childMessage.updatedAt.toISOString(),
                  user: expectedUser,
                },
              ],
              createdAt: parentMessage.createdAt.toISOString(),
              updatedAt: parentMessage.updatedAt.toISOString(),
              user: expectedUser,
            },
          ],
          createdAt: thread.createdAt.toISOString(),
          updatedAt: thread.updatedAt.toISOString(),
          user: expectedUser,
        },
      ]);
    },
  );
});
