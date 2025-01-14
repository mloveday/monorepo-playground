import { GetLocator } from "@/types/get-locator";

export class HealthcheckFeature {
  public static getHeader: GetLocator = async (page) =>
    page.getByRole("heading", { name: "Load sample API endpoint data" });

  public static getReloadButton: GetLocator = async (page) =>
    page.getByRole("button", { name: "Reload" });

  public static getCheckbox: GetLocator = async (page) =>
    page.getByRole("checkbox", { name: "Force API success" });

  public static getLoading: GetLocator = async (page) =>
    page.getByText("loading");

  public static getFetching: GetLocator = async (page) =>
    page.getByText("fetching");

  public static getGoodApiMessage: GetLocator = async (page) =>
    page.getByText("All good");

  public static getBadApiMessage: GetLocator = async (page) =>
    page.getByText("Nope");
}
