import { Prisma, getPrisma } from "@repo/db";
import {
  findMostRecentlyCreatedSomeData,
  storeSomeData,
} from "@repo/server/repo/some-data/some-data-repo.js";
import { buildSomeData } from "@repo/server/test/builders/some-data/build-some-data.js";
import { describe, expect, it, vi } from "vitest";

describe("some-data-repo", () => {
  describe("storeSomeData", () => {
    it("should create some data", async () => {
      const someData = buildSomeData({});
      await storeSomeData(someData);
      expect(getPrisma().someData.create).toHaveBeenCalledWith({
        data: someData,
      });
    });
  });

  describe("findMostRecentlyCreatedSomeData", () => {
    it("should find the most recent some data", async () => {
      const someData = [buildSomeData({})];
      vi.mocked(getPrisma().someData.findMany).mockResolvedValue(someData);

      const result = await findMostRecentlyCreatedSomeData(5);

      expect(result).toEqual(someData);
      expect(getPrisma().someData.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: Prisma.SortOrder.desc },
        take: 5,
      });
    });

    it("should find the most recent some data from the cursor", async () => {
      const someData = [buildSomeData({})];
      vi.mocked(getPrisma().someData.findMany).mockResolvedValue(someData);

      const result = await findMostRecentlyCreatedSomeData(5, 10);

      expect(result).toEqual(someData);
      expect(getPrisma().someData.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: Prisma.SortOrder.desc },
        cursor: { id: 10 },
        take: 5,
      });
    });
  });
});
