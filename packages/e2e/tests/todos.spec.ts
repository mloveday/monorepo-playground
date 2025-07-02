import { TodoFeature } from "@/features/todo-feature";
import { TodosPage } from "@/pages/todos-page";
import { expect, test } from "@playwright/test";

test.describe("/todos", () => {
  test("should have title", async ({ page }) => {
    const todosPage = new TodosPage(page);
    await todosPage.goto();

    await expect(page).toHaveTitle("Monorepo Playground");
    await expect(await todosPage.getTitle()).toBeVisible();
  });

  test("should include TODO functionality", async ({ page }) => {
    const todosPage = new TodosPage(page);
    await todosPage.goto();

    const initialTodo = {
      title: "Add TODO functionality",
      notes:
        "This is a bit useless without being able to add things to the list",
    };

    await expect(await todosPage.getTodoHeader()).toBeVisible();

    const list = await todosPage.getTodoList();

    // initial todo should be present
    const initialTodoContainer = TodoFeature.getTodoByTitle(
      list,
      initialTodo.title,
    );
    await expect(initialTodoContainer).toBeVisible();
    await expect(TodoFeature.getTodoNotes(initialTodoContainer)).toHaveText(
      initialTodo.notes,
    );

    // remove the initial todo
    await TodoFeature.getTodoRemoveButton(initialTodoContainer).click();

    // initial todo should be removed
    await expect(
      TodoFeature.getTodoByTitle(list, initialTodo.title),
    ).not.toBeAttached();

    // Add a todo
    const addTodoForm = await todosPage.getAddTodoForm();
    const todo = {
      title: "some todo",
      notes: "some notes",
    };

    await TodoFeature.getTitleInput(addTodoForm).fill("fail");
    await TodoFeature.getTitleInput(addTodoForm).blur();
    await expect(TodoFeature.getTitleError(addTodoForm)).toHaveText(
      "String must contain at least 5 character(s)",
    );

    await TodoFeature.getTitleInput(addTodoForm).fill(todo.title);
    await TodoFeature.getNotesInput(addTodoForm).fill(todo.notes);
    await TodoFeature.getAddTodoButton(addTodoForm).click();

    const rhfTodoContainer = TodoFeature.getTodoByTitle(list, todo.title);
    await expect(rhfTodoContainer).toBeVisible();
    await expect(TodoFeature.getTodoNotes(rhfTodoContainer)).toHaveText(
      todo.notes,
    );
  });
});
