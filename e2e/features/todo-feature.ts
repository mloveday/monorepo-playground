import { GetLocator } from "@/types/get-locator";
import { Locator } from "@playwright/test";
import { getParent } from "@/lib/get-parent";

export class TodoFeature {
  public static getHeader: GetLocator = async (page) =>
    page.getByRole("heading", { name: "Todo app with ephemeral state" });

  public static getTodoList: GetLocator = async (page) =>
    TodoFeature.getHeader(page).then((l) => l.locator("..").getByRole("list"));

  public static getTodoByTitle: (todoList: Locator, title: string) => Locator =
    (todoList, title) =>
      getParent(
        todoList.getByRole("heading", {
          name: title,
        }),
      );

  public static getTodoTitle = (todo: Locator): Locator =>
    todo.getByRole("heading");

  public static getTodoNotes = (todo: Locator): Locator =>
    todo.getByRole("paragraph");

  public static getTodoRemoveButton = (todo: Locator): Locator =>
    todo.getByRole("button", { name: "Remove" });

  public static getFormikForm: GetLocator = async (page) =>
    page.getByTestId("add-todo-formik");

  public static getReactHookFormsForm: GetLocator = async (page) =>
    page.getByTestId("add-todo-react-hook-forms");

  public static getTitleInput = (form: Locator) =>
    form.getByRole("textbox", { name: "title" });

  public static getTitleError = (form: Locator) =>
    getParent(TodoFeature.getTitleInput(form)).getByTestId("form-error");

  public static getNotesInput = (form: Locator) =>
    form.getByRole("textbox", { name: "notes" });

  public static getNotesError = (form: Locator) =>
    getParent(TodoFeature.getNotesInput(form)).getByTestId("form-error");

  public static getAddTodoButton = (form: Locator) =>
    form.getByRole("button", { name: "Add todo" });
}
