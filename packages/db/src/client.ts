import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const getPrisma = () => {
  const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

  return prisma;
};
