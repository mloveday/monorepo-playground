import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTodoService } from "@/state/use-todo-service";
import { buildTodo } from "@repo/test/builders/todo/build-todo";

describe("useTodoService", () => {
  const initialTodo = {
    id: "1",
    title: "Add TODO functionality",
    notes: "This is a bit useless without being able to add things to the list",
  };

  it("should allow adding, removing and resetting todos", async () => {
    const result = renderHook(useTodoService);

    expect(result.result.current.state.todos).toEqual([initialTodo]);
    expect(result.result.current.state.isEmpty).toBe(false);

    // remove the initial todo
    result.result.current.removeTodo({ id: initialTodo.id });

    await waitFor(() => expect(result.result.current.state.todos).toEqual([]));
    expect(result.result.current.state.isEmpty).toBe(true);

    // add a todo when none exist
    const todo = buildTodo({});
    result.result.current.addTodo(todo);

    await waitFor(() =>
      expect(result.result.current.state.todos).toEqual([todo]),
    );
    expect(result.result.current.state.isEmpty).toBe(false);

    // reset everything
    result.result.current.reset();

    await waitFor(() =>
      expect(result.result.current.state.todos).toEqual([initialTodo]),
    );
    expect(result.result.current.state.isEmpty).toBe(false);

    // add a todo when one exists
    result.result.current.addTodo(todo);

    await waitFor(() =>
      expect(result.result.current.state.todos).toEqual([initialTodo, todo]),
    );
    expect(result.result.current.state.isEmpty).toBe(false);
  });
});
