import { type Page, type Response } from "@playwright/test";

export abstract class AppPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public abstract goto: () => Promise<null | Response>;
}
