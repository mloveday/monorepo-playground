import { describe, expect, it } from "vitest";
import {} from "@repo/schemas/api/board/board-thread.ts";
import { faker } from "@faker-js/faker/locale/en";
import {
  boardMessageResponse,
  createBoardMessageRequest,
} from "@repo/schemas/api/board/board-message.ts";

describe("board message schemas", () => {
  describe("board message response", () => {
    it("should parse valid data", () => {
      const data = {
        id: faker.number.int(),
        message: faker.lorem.sentence(),
        boardThreadId: faker.number.int(),
        childMessages: [],
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        user: {
          sub: faker.string.uuid(),
          name: faker.person.fullName(),
          provider: "keycloak",
        },
      };

      expect(boardMessageResponse.parse(data)).toEqual(data);
    });
  });

  describe("create board message request", () => {
    it("should parse valid data without parentMessageId", () => {
      const data = {
        message: faker.lorem.sentence(),
        boardThreadId: faker.number.int(),
      };

      expect(createBoardMessageRequest.parse(data)).toEqual(data);
    });

    it("should parse valid data with parentMessageId", () => {
      const data = {
        message: faker.lorem.sentence(),
        boardThreadId: faker.number.int(),
        parentMessageId: faker.number.int(),
      };

      expect(createBoardMessageRequest.parse(data)).toEqual(data);
    });
  });
});
