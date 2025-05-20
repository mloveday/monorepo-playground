import { HealthcheckFeature } from "@/features/healthcheck-feature";
import { TodoFeature } from "@/features/todo-feature";
import { AppPage } from "@/pages/app-page";

export class HomePage extends AppPage {
  public goto = async () => this.page.goto("/");

  public getHeader = async () =>
    this.page.getByRole("heading", { name: "HL POC" });

  public getApiHeader = async () => HealthcheckFeature.getHeader(this.page);

  public getApiReloadButton = async () =>
    HealthcheckFeature.getReloadButton(this.page);

  public getApiCheckbox = async () => HealthcheckFeature.getCheckbox(this.page);

  public getApiLoading = async () => HealthcheckFeature.getLoading(this.page);

  public getApiFetching = async () => HealthcheckFeature.getFetching(this.page);

  public getGoodApiMessage = async () =>
    HealthcheckFeature.getGoodApiMessage(this.page);

  public getBadApiMessage = async () =>
    HealthcheckFeature.getBadApiMessage(this.page);

  public getTodoHeader = async () => TodoFeature.getHeader(this.page);

  public getTodoList = async () => TodoFeature.getTodoList(this.page);

  public getTodoByTitle = async (title: string) =>
    TodoFeature.getTodoByTitle(await this.getTodoList(), title);

  public getTodoRHFForm = async () =>
    TodoFeature.getReactHookFormsForm(this.page);
}
