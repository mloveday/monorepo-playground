import { TodoFeature } from "@/features/todo-feature";
import { AppPage } from "@/pages/app-page";

export class TodosPage extends AppPage {
  public goto = async () => this.page.goto("/todos");

  public getTodoHeader = async () => TodoFeature.getHeader(this.page);

  public getTodoList = async () => TodoFeature.getTodoList(this.page);

  public getTodoByTitle = async (title: string) =>
    TodoFeature.getTodoByTitle(await this.getTodoList(), title);

  public getAddTodoForm = async () => TodoFeature.getAddTodoForm(this.page);
}
