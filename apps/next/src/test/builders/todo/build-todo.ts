import { faker } from "@faker-js/faker/locale/en";
import { v4 } from "uuid";

import type { Todo } from "@/client/state/use-todo-service";

export const buildTodo = <Overrides extends Partial<Todo>>(
  overrides: Overrides,
): Omit<Todo, keyof Overrides> & Overrides => ({
  id: v4(),
  title: faker.lorem.sentence(),
  ...overrides,
});
