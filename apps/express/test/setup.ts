import { beforeAll, beforeEach, vi } from "vitest";
import { jwtVerify } from "jose";
import { jwtVerifyDecodeOnlyMock } from "@/test/builders/jwt-verify-decode-only-mock.ts";
import { getPrisma, PrismaClient } from "@repo/db";
import { v4 } from "uuid";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { Console } from "node:console";

vi.mock("jose", { spy: true });
vi.mock(import("@repo/db"), async (importOriginal) => {
  const og = await importOriginal();
  return { ...og, getPrisma: vi.fn() };
});

const dbPackageLocation = join(__dirname, "..", "..", "..", "packages", "db");
const dbSchemaLocation = join(dbPackageLocation, "prisma", "schema.prisma");

// skips vitest silencing logs in test lifecycle methods
const logger = new Console(process.stdout, process.stderr);

beforeAll(async () => {
  // define random schema, set up prisma connection
  const schema = `test-${v4()}`;
  logger.log("[setup]", "setting up schema connection", schema);
  const url = new URL(
    `postgresql://test:test@localhost:5434/test?schema=${schema}`,
  ).toString();
  process.env.DATABASE_URL = url;
  vi.mocked(getPrisma).mockReturnValue(
    new PrismaClient({
      datasources: { db: { url } },
    }),
  );

  // create DB structure
  logger.log("[setup]", "creating schema", schema);
  execSync(
    `npm exec --prefix ${dbPackageLocation} prisma db push -- --schema=${dbSchemaLocation}`,
    {
      env: {
        ...process.env,
        DATABASE_URL: url,
      },
    },
  );

  // clean up schemas after tests complete
  return async () => {
    logger.log("[setup]", "deleting schema", schema);
    await getPrisma().$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`,
    );
    await getPrisma().$disconnect();
  };
});

beforeEach(async () => {
  // clear tables of data
  logger.log("[setup]", "truncating tables");
  await getPrisma().$executeRawUnsafe(`
    truncate table "board_message", "board_thread", "user" cascade;
  `);

  // allow authentication using unsigned JWTs
  vi.mocked(jwtVerify).mockImplementation(jwtVerifyDecodeOnlyMock);
});
