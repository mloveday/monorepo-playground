import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/src/app.ts";
import { bearerTokenBuilder } from "@/test/builders/bearer-token-builder.ts";
import { getPrisma } from "@repo/db";
import { dateRegex } from "@/test/assertions/date.ts";

describe("POST board/threads", () => {
  it("should create thread when user is authenticated", async () => {
    const user = {
      sub: "some-sub",
      name: "Some Person",
      email: "someone@example.com",
    };

    const body = {
      title: "some title",
      message: "some message",
    };

    const response = await supertest(app)
      .post("/board/threads")
      .send(body)
      .set("Authorization", `Bearer ${bearerTokenBuilder(user)}`)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      message: body.message,
      title: body.title,
      boardMessages: [],
      createdAt: expect.stringMatching(dateRegex),
      updatedAt: expect.stringMatching(dateRegex),
      user: {
        sub: user.sub,
        name: user.name,
        provider: "keycloak",
      },
    });

    expect(
      await getPrisma().boardThread.findUnique({
        where: { id: response.body.id },
      }),
    ).toEqual({
      id: response.body.id,
      message: body.message,
      title: body.title,
      createdAt: new Date(response.body.createdAt),
      updatedAt: new Date(response.body.updatedAt),
      expiresAt: null,
      userSub: user.sub,
    });
  });

  it("should reject the request when user is not authenticated", async () => {
    await supertest(app)
      .post("/board/threads")
      .send({
        title: "some title",
        message: "some message",
      })
      .expect(403);

    expect(await getPrisma().boardThread.findMany({})).toHaveLength(0);
  });
});
