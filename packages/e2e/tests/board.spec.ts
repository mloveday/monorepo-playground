import { BoardPage } from "@/pages/board-page";
import { expect, test } from "@playwright/test";

test.describe("/board", () => {
  test("should have title", async ({ page }) => {
    const board = new BoardPage(page);
    await board.goto();

    await expect(page).toHaveTitle("Monorepo Playground");
    await expect(await board.getTitle()).toBeVisible();
  });
});
