import { Prisma, type SomeData, getPrisma } from "@repo/db";

export const storeSomeData = (
  data: Prisma.SomeDataCreateInput,
): Promise<SomeData> => getPrisma().someData.create({ data });

export const findMostRecentlyCreatedSomeData = (
  count: number,
  cursor?: number,
): Promise<SomeData[]> =>
  getPrisma().someData.findMany({
    orderBy: { createdAt: Prisma.SortOrder.desc },
    cursor: cursor ? { id: cursor } : undefined,
    take: count,
  });
