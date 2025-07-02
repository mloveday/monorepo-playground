export const Blurb = () => (
  <>
    <p>
      A space to try out a monorepo with a React frontend and express.js backend
    </p>
    <p>Implements a basic message board:</p>
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li>Top-level threads, with a title & message</li>
      <li>
        Messages within a thread, with self-referential structure to allow for
        nestable replies
      </li>
    </ol>
    <p>Tech details include:</p>
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li>
        Turbo for managing the monorepo, syncpack for managing dependency
        versions across apps & packages
      </li>
      <li>
        Vanilla React app, with Vite for local dev & bundling and Vitest for
        testing. Very thin layer, functionality is mostly in a package for easy
        switching of tech (e.g. to Next.js)
      </li>
      <li>Express.js API</li>
      <li>
        Separate internal packages for client-side code, server-side code and
        other shared code & functionality
      </li>
      <li>
        Shared types & Zod schemas for the client-API interface - both sides of
        the API must be in-sync when anything changes
      </li>
      <li>Containerised PostgreSQL databases for dev & testing purposes</li>
      <li>Integration testing uses an isolated schema for each test suite</li>
      <li>RTK query for client API calls</li>
      <li>Keycloak IDP providing authentication</li>
      <li>Biome for linting, internal package for sharing config</li>
      <li>Typescript used throughout, internal package for sharing configs</li>
      <li>Tailwind for styling, internal package for sharing config</li>
    </ol>
  </>
);
