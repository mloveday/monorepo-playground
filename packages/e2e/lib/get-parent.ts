import { Locator } from "@playwright/test";

export const getParent = (locator: Locator): Locator => locator.locator("..");
