import { TodoFeature } from "@/features/todo-feature";
import { HomePage } from "@/pages/home-page";
import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should have title", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle("HL Test App");
    await expect(await home.getHeader()).toBeVisible();
  });

  test("should load API data, reload and change option", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(await home.getApiHeader()).toBeVisible();

    await expect(await home.getApiLoading()).toBeVisible();
    await expect(await home.getGoodApiMessage()).toBeVisible();

    await (await home.getApiReloadButton()).click();
    await expect(await home.getApiFetching()).toBeVisible();
    await expect(await home.getGoodApiMessage()).toBeVisible();

    await (await home.getApiCheckbox()).click();
    await expect(await home.getApiFetching()).toBeVisible();
    await expect(await home.getBadApiMessage()).toBeVisible();
  });

  test("should include TODO functionality", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const initialTodo = {
      title: "Add TODO functionality",
      notes:
        "This is a bit useless without being able to add things to the list",
    };

    await expect(await home.getTodoHeader()).toBeVisible();

    const list = await home.getTodoList();

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
    const rhfForm = await home.getTodoRHFForm();
    const rhfTodo = {
      title: "RHF todo",
      notes: "RHF notes",
    };

    await TodoFeature.getTitleInput(rhfForm).fill("fail");
    await expect(TodoFeature.getTitleError(rhfForm)).toHaveText(
      "String must contain at least 5 character(s)",
    );

    await TodoFeature.getTitleInput(rhfForm).fill(rhfTodo.title);
    await TodoFeature.getNotesInput(rhfForm).fill(rhfTodo.notes);
    await TodoFeature.getAddTodoButton(rhfForm).click();

    const rhfTodoContainer = TodoFeature.getTodoByTitle(list, rhfTodo.title);
    await expect(rhfTodoContainer).toBeVisible();
    await expect(TodoFeature.getTodoNotes(rhfTodoContainer)).toHaveText(
      rhfTodo.notes,
    );
  });
});
