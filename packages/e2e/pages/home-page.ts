import { AppPage } from "@/pages/app-page";

export class HomePage extends AppPage {
  public goto = async () => this.page.goto("/");
}
