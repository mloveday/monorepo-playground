import { faker } from "@faker-js/faker/locale/en";

export const idInteger = () => ({
  id: faker.number.int({ min: 100_000, max: 999_999 }),
});
