import { faker } from "@faker-js/faker/locale/en";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type TodoService, useTodoService } from "@/state/use-todo-service";
import { buildTodo } from "@repo/test/builders/todo/build-todo";
import { Todos } from "./todos";

vi.mock("@/state/use-todo-service");

describe("Todos", () => {
  const buildTodoService = (overrides?: Partial<TodoService>): TodoService => ({
    state: {
      todos: [],
      isEmpty: true,
    },
    addTodo: vi.fn(),
    removeTodo: vi.fn(),
    reset: vi.fn(),
    ...overrides,
  });

  beforeEach(() => {
    vi.mocked(useTodoService).mockReturnValue(buildTodoService());
  });

  it("should show an empty list message when no TODOs are present", () => {
    const result = render(<Todos />);

    expect(
      result.getByText(
        "You have nothing to do! You can add tasks in the form below.",
      ),
    ).not.toBeNull();
  });

  it("should show todos from useTodoService", () => {
    const todo = buildTodo({
      notes: faker.lorem.sentence(),
    });
    vi.mocked(useTodoService).mockReturnValue(
      buildTodoService({
        state: { todos: [todo], isEmpty: false },
      }),
    );

    const result = render(<Todos />);

    expect(
      result.findByText(
        "You have nothing to do! You can add tasks in the form below.",
      ),
    ).not.toBeNull();

    expect(result.getByRole("heading", { name: todo.title })).not.toBeNull();
    expect(result.getByText(todo.notes)).not.toBeNull();
  });

  it("should trigger the TodoService reset", async () => {
    const todoService = buildTodoService();
    vi.mocked(useTodoService).mockReturnValue(todoService);

    const result = render(<Todos />);

    await userEvent.click(result.getByRole("button", { name: "Reset" }));

    expect(todoService.reset).toHaveBeenCalledOnce();
  });

  const formTestIdCases = [["add-todo-formik"], ["add-todo-react-hook-forms"]];

  it.each(formTestIdCases)(
    "should trigger adding a todo without notes to the TodoService (%s)",
    async (formId) => {
      const todoService = buildTodoService();
      vi.mocked(useTodoService).mockReturnValue(todoService);
      const title = "some title";

      const result = render(<Todos />);

      const form = within(result.getByTestId(formId));
      await userEvent.type(form.getByRole("textbox", { name: /Title/ }), title);
      await userEvent.click(form.getByRole("button", { name: "Add todo" }));

      expect(todoService.addTodo).toHaveBeenCalledWith({
        id: expect.stringContaining(""),
        title,
      });
    },
  );

  it.each(formTestIdCases)(
    "should trigger adding a todo with notes to the TodoService (%s)",
    async (formId) => {
      const todoService = buildTodoService();
      vi.mocked(useTodoService).mockReturnValue(todoService);
      const title = "some title";
      const notes = "some notes";

      const result = render(<Todos />);

      const form = within(result.getByTestId(formId));
      await userEvent.type(form.getByRole("textbox", { name: /Title/ }), title);
      await userEvent.type(
        form.getByRole("textbox", { name: /Notes \(optional\)/ }),
        notes,
      );
      await userEvent.click(form.getByRole("button", { name: "Add todo" }));

      expect(todoService.addTodo).toHaveBeenCalledWith({
        id: expect.stringContaining(""),
        title,
        notes,
      });
    },
  );

  it("should trigger removing a todo from the TodoService", async () => {
    const todo = buildTodo({});
    const todoService = buildTodoService({
      state: { todos: [todo], isEmpty: false },
    });
    vi.mocked(useTodoService).mockReturnValue(todoService);

    const result = render(<Todos />);

    await userEvent.click(result.getByRole("button", { name: "Remove" }));

    expect(todoService.removeTodo).toHaveBeenCalledWith(todo);
  });
});
