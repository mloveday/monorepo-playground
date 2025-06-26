import { faker } from "@faker-js/faker/locale/en";
import {
  boardThreadResponse,
  createBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";
import { describe, expect, it } from "vitest";

describe("board thread schemas", () => {
  describe("board thread response", () => {
    it("should parse valid data", () => {
      const data = {
        id: faker.number.int(),
        title: faker.lorem.sentence(),
        message: faker.lorem.sentence(),
        boardMessages: [
          {
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
          },
        ],
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        user: {
          sub: faker.string.uuid(),
          name: faker.person.fullName(),
          provider: "keycloak",
        },
      };

      expect(boardThreadResponse.parse(data)).toEqual(data);
    });
  });

  describe("create board thread request", () => {
    it("should parse valid data", () => {
      const data = {
        title: faker.lorem.sentence(),
        message: faker.lorem.sentence(),
      };

      expect(createBoardThreadRequest.parse(data)).toEqual(data);
    });
  });
});
