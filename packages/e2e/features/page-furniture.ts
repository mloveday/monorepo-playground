import type { GetLocator } from "@/types/get-locator";

export class PageFurniture {
  public static title: GetLocator = async (page) =>
    page.getByRole("heading", { name: "Monorepo Playground" });

  public static signIn: GetLocator = async (page) =>
    page.getByRole("button", { name: "Sign In" });
  public static signOut: GetLocator = async (page) =>
    page.getByRole("button", { name: "Sign Out" });

  public static navHome: GetLocator = async (page) =>
    page.getByRole("link", { name: "Home" });
  public static navBoard: GetLocator = async (page) =>
    page.getByRole("link", { name: "Board" });
  public static navTodos: GetLocator = async (page) =>
    page.getByRole("link", { name: "Todos" });

  public static expressApiRadio: GetLocator = async (page) =>
    page.getByRole("radio", { name: "Express" });
  public static javaApiRadio: GetLocator = async (page) =>
    page.getByRole("radio", { name: "Java" });
}
