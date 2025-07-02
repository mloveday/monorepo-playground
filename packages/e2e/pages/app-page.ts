import { PageFurniture } from "@/features/page-furniture";
import type { Page, Response } from "@playwright/test";

export abstract class AppPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public abstract goto: () => Promise<null | Response>;

  public getTitle = async () => PageFurniture.title(this.page);

  public signIn = async () => PageFurniture.signIn(this.page);
  public signOut = async () => PageFurniture.signOut(this.page);

  public navHome = async () => PageFurniture.navHome(this.page);
  public navBoard = async () => PageFurniture.navBoard(this.page);
  public navTodos = async () => PageFurniture.navTodos(this.page);

  public expressApiRadio = async () => PageFurniture.expressApiRadio(this.page);
  public javaApiRadio = async () => PageFurniture.javaApiRadio(this.page);
}
