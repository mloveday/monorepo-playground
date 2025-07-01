import "./App.css";
import { ApiSelector } from "@repo/client/components/api-selector.tsx";
import { AuthButton } from "@repo/client/components/auth-button.tsx";
import { Board } from "@repo/client/components/board/board.tsx";
import { Todos } from "@repo/client/components/todo/todos.tsx";
import { NavLink, Route, Routes } from "react-router";
import { Blurb } from "./components/blurb.tsx";

export const App = () => (
  <div className="grid grid-rows-[4rem_1fr_4rem] items-center justify-items-center min-h-screen w-screen font-[family-name:var(--font-geist-sans)]">
    <header className="grid grid-cols-2 gap-8">
      <h1>Monorepo Playground</h1>
      <ul className="flex flex-row gap-4">
        <li className="flex align-middle">
          <NavLink to="/" className="self-center">
            Home
          </NavLink>
        </li>
        <li className="flex align-middle">
          <NavLink to="/board" className="self-center">
            Board
          </NavLink>
        </li>
        <li className="flex align-middle">
          <NavLink to="/todos" className="self-center">
            Todos
          </NavLink>
        </li>
        <li>
          <AuthButton />
        </li>
        <li>
          <ApiSelector />
        </li>
      </ul>
    </header>
    <main className="w-full flex flex-col gap-8 row-start-2 items-center sm:items-start p-8">
      <Routes>
        <Route index element={<Blurb />} />
        <Route path="board" element={<Board />} />
        <Route path="todos" element={<Todos />} />
      </Routes>
    </main>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div>Some footer text</div>
    </footer>
  </div>
);
