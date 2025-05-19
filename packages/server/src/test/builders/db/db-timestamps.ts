import { faker } from "@faker-js/faker/locale/en";

export const dbTimestamps = () => {
  const createdAt = faker.date.recent({ days: 7 });
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
  return {
    createdAt,
    updatedAt,
    expiresAt: null,
  };
};
