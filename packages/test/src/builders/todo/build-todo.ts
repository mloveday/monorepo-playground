import { faker } from "@faker-js/faker/locale/en";
import type { Todo } from "@repo/schemas/state/todo.ts";
import { v4 } from "uuid";

export const buildTodo = <Overrides extends Partial<Todo>>(
  overrides: Overrides,
): Omit<Todo, keyof Overrides> & Overrides => ({
  id: v4(),
  title: faker.lorem.sentence(),
  ...overrides,
});
