# TS monorepo example

Personal project to try things out. Consists of:
- monorepo using turbo
- vanilla react frontend
- express API
  - backed by a Docker-based Postgres DB
  - java API is also configured in another repo, can be swapped in the frontend by using the `javaApi` RTK query API
  - integration tested using a separate Docker postgres DB & supertest
- nextjs app (largely ignored now in favour of vanilla react - may not work as expected)
- packages as follows:
  - typescript, linting and styling config are all shared packages
  - client-side react code
  - DB connection, definitions and migrations via prisma
  - Playwright e2e tests (WIP - based on an older version of the app and now broken)
  - lib - basic shared JS-only utils
  - schemas for validating requests & responses, and sharing the shape of the API interface between front & back ends
  - server-side code - e.g. mapping models, repositories, SS business logic etc
  - test utils, e.g. builders for test fixtures
  - zod builders, a package that takes a zod schema and generates fake data of the appropriate shape from it

## Requirements

- Docker
- Node
  - NVM TBC

## First time setup

1. run `npm install` to install dependencies
2. run `npm run db:local:up`, `npm run db:test:up` to spin up local & test databases in docker (requires docker cli to be running)

## Getting started

`apps/` contains runnable apps, e.g. the express server or the React app.

`packages/` contains packages used by apps and other packages, and are not runnable, e.g. config, schemas, shared code, etc.

- Apply DB migrations with `npm run db:deploy`. Must be done before running the app for the first time or when a new migration is required.
- Run all apps with `npm run dev`
- Run linting checks with `npm run lint` and fix applicable issues with `npm run lint:fix`. Type-checking is done with `npm run check-types`
- Run tests with `npm run test` or `npm run test:coverage` for coverage. Coverage is stored in the `coverage` folder within each applicable app or package folder.

- Create a DB migration by editing `packages/db/prisma/schema.prisma`, then running `npm run db:migrate`.
- If your prisma types are out of sync with your DB, run `npm run db:generate`, this should not be necessary generally, though can be useful when prepping a new migration in the schema before applying the changes to the DB.

Individual apps and packages may have the same scripts defined above. If you are working solely within one package or app, you may wish to run only the one script. However, turbo does cache results based on code changes, so you can run the top-level script, and you should find it is not noticeably slower.
