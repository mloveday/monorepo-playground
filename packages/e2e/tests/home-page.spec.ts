import { HomePage } from "@/pages/home-page";
import { expect, test } from "@playwright/test";

test.describe("/", () => {
  test("should have title", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle("Monorepo Playground");
    await expect(await home.getTitle()).toBeVisible();
  });
});
