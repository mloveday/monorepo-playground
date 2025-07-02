import { AppPage } from "@/pages/app-page";

export class BoardPage extends AppPage {
  public goto = async () => this.page.goto("/board");
}
