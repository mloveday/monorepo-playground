import type { Locator, Page } from "@playwright/test";

export type GetLocator = (page: Page) => Promise<Locator>;
