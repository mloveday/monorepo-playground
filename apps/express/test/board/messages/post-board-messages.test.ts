import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/src/app.ts";
import { bearerTokenBuilder } from "@/test/builders/bearer-token-builder.ts";
import { getPrisma } from "@repo/db";
import { persistUser } from "@/test/data/persist-user.ts";
import { persistThread } from "@/test/data/persist-thread.ts";
import { persistMessage } from "@/test/data/persist-message.ts";
import { dateRegex } from "@/test/assertions/date.ts";

describe("POST board/messages", () => {
  it("should create message on a thread when user is authenticated", async () => {
    const user = await persistUser();
    const thread = await persistThread(user);

    const body = {
      boardThreadId: thread.id,
      message: "some message",
    };

    const response = await supertest(app)
      .post("/board/messages")
      .send(body)
      .set("Authorization", `Bearer ${bearerTokenBuilder(user)}`)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      message: body.message,
      boardThreadId: thread.id,
      childMessages: [],
      createdAt: expect.stringMatching(dateRegex),
      updatedAt: expect.stringMatching(dateRegex),
      user: {
        sub: user.sub,
        name: user.name,
        provider: "keycloak",
      },
    });

    expect(
      await getPrisma().boardMessage.findUnique({
        where: { id: response.body.id },
      }),
    ).toEqual({
      id: response.body.id,
      message: body.message,
      boardThreadId: thread.id,
      parentMessageId: null,
      createdAt: new Date(response.body.createdAt),
      updatedAt: new Date(response.body.updatedAt),
      expiresAt: null,
      userSub: user.sub,
    });
  });

  it("should create message reply on another message when user is authenticated", async () => {
    const user = await persistUser();
    const thread = await persistThread(user);
    const parentMessage = await persistMessage(thread, user, {
      message: "parent message",
    });

    const body = {
      boardThreadId: thread.id,
      parentMessageId: parentMessage.id,
      message: "some message",
    };

    const response = await supertest(app)
      .post("/board/messages")
      .send(body)
      .set("Authorization", `Bearer ${bearerTokenBuilder(user)}`)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      message: body.message,
      boardThreadId: thread.id,
      parentMessageId: parentMessage.id,
      childMessages: [],
      createdAt: expect.stringMatching(dateRegex),
      updatedAt: expect.stringMatching(dateRegex),
      user: {
        sub: user.sub,
        name: user.name,
        provider: "keycloak",
      },
    });

    expect(
      await getPrisma().boardMessage.findUnique({
        where: { id: response.body.id },
      }),
    ).toEqual({
      id: response.body.id,
      message: body.message,
      boardThreadId: thread.id,
      parentMessageId: parentMessage.id,
      createdAt: new Date(response.body.createdAt),
      updatedAt: new Date(response.body.updatedAt),
      expiresAt: null,
      userSub: user.sub,
    });
  });

  it("should reject the request when user is not authenticated", async () => {
    await supertest(app)
      .post("/board/messages")
      .send({
        boardThreadId: 1,
        message: "some message",
      })
      .expect(403);

    expect(await getPrisma().boardThread.findMany({})).toHaveLength(0);
  });

  it("should reject the request when user authentication is not a JWT", async () => {
    await supertest(app)
      .post("/board/messages")
      .set("Authorization", "Bearer not-a-token")
      .send({
        boardThreadId: 1,
        message: "some message",
      })
      .expect(403);

    expect(await getPrisma().boardThread.findMany({})).toHaveLength(0);
  });

  it("should reject the request when thread is not found", async () => {
    const user = await persistUser();

    await supertest(app)
      .post("/board/messages")
      .set("Authorization", `Bearer ${bearerTokenBuilder(user)}`)
      .send({
        boardThreadId: 1,
        message: "some message",
      })
      .expect(404);

    expect(await getPrisma().boardThread.findMany({})).toHaveLength(0);
  });
});
