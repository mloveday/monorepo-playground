"use client";
import { ClientBoundary } from "@repo/client/client-boundary.tsx";
import { InteractiveHealthCheck } from "@repo/client/components/healthcheck/interactive-health-check.tsx";
import { AddSomeData } from "@repo/client/components/some-data/add-some-data.tsx";
import { RecentSomeData } from "@repo/client/components/some-data/recent-some-data.tsx";
import { Todos } from "@repo/client/components/todo/todos.tsx";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>HL POC</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Next.JS</li>
          <li>RTK query for client API calls</li>
        </ol>
        <ClientBoundary>
          <InteractiveHealthCheck />
          <RecentSomeData />
          <AddSomeData />
          <Todos />
        </ClientBoundary>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>Some footer text</div>
      </footer>
    </div>
  );
}
