import {Reducer, useMemo, useReducer} from "react";

export type Todo = {
  id: string,
  title: string,
  notes?: string,
};

export type TodoState = {
  todos: Todo[],
  isEmpty: boolean,
};

enum TodoActionKey {
  RESET = 'reset',
  ADD = 'add',
  REMOVE = 'remove',
}

type TodoAction = {
  action: TodoActionKey.RESET,
} | {
  action: TodoActionKey.ADD,
  payload: Todo,
} | {
  action: TodoActionKey.REMOVE,
  payload: Pick<Todo, 'id'>,
};

const initialState = {
  todos: [{
    id: '1',
    title: 'Add TODO functionality',
    notes: 'This is a bit useless without being able to add things to the list',
  }],
  isEmpty: true,
} satisfies TodoState;

const todoReducer: Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.action) {
    case TodoActionKey.RESET:
      return initialState;
    case TodoActionKey.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isEmpty: false,
      };
    case TodoActionKey.REMOVE:
      let todos = state.todos.filter(t => t.id !== action.payload.id);
      return {
        ...state,
        todos,
        isEmpty: todos.length === 0,
      };
  }
};

const addTodo = (todo: Todo): TodoAction => ({
  action: TodoActionKey.ADD,
  payload: todo,
});

const removeTodo = (todo: Pick<Todo, 'id'>): TodoAction => ({
  action: TodoActionKey.REMOVE,
  payload: todo,
});

const resetTodos = (): TodoAction => ({action: TodoActionKey.RESET});

export const useTodoState = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // memoise the state to prevent re-renders based on this state. Note this shouldn't be needed,
  // and may even be a performance hit, depending on usage
  return useMemo(() => ({
    state,
    addTodo: (todo: Todo) => dispatch(addTodo(todo)),
    removeTodo: (todo: Pick<Todo, 'id'>) => dispatch(removeTodo(todo)),
    reset: () => dispatch(resetTodos()),
  }), [state]);
};