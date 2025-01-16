import { AddTodoFormik } from "@repo/client/components/todo/add-todo-formik.tsx";
import { AddTodoReactHookForms } from "@repo/client/components/todo/add-todo-react-hook-forms.tsx";
import { useTodoService } from "@repo/client/state/use-todo-service.ts";

// basic TODO app
export const Todos = () => {
  // note: any state management should not be done inside components if at all possible.
  // custom hooks can do what we need and make testing _much_ simpler
  const todos = useTodoService();
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Todo app with ephemeral state</h2>
      {todos.state.todos.length === 0 && (
        <p className="box text-gray-400">
          You have nothing to do! You can add tasks in the form below.
        </p>
      )}
      <ul className="flex flex-col gap-4">
        {todos.state.todos.map((todo) => (
          <li className="box flex flex-col gap-2" key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.notes}</p>
            <button type="button" onClick={() => todos.removeTodo(todo)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="auto-grid-lg w-full gap-2">
        <AddTodoFormik addTodo={todos.addTodo} />
        <AddTodoReactHookForms addTodo={todos.addTodo} />
      </div>
      <button type="button" onClick={todos.reset}>
        Reset
      </button>
    </div>
  );
};
