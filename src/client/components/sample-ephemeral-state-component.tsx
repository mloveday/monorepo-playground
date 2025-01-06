import { buttonStyles } from "@/client/components/common/button";
import { AddTodo } from "@/client/components/todo/add-todo";
import { useTodoService } from "@/client/state/todos";

// basic TODO app
export const SampleEphemeralStateComponent = () => {
  // note: any state management should not be done inside components if at all possible.
  // custom hooks can do what we need and make testing _much_ simpler
  const todos = useTodoService();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Todo app with ephemeral state</h2>
      {todos.state.todos.length === 0}
      {todos.state.todos.map((todo) => (
        <div
          className="border rounded-md p-2 flex flex-col gap-2"
          key={todo.id}
        >
          <h3 className="font-bold">{todo.title}</h3>
          <p>{todo.notes}</p>
          <button
            className={buttonStyles}
            onClick={() => todos.removeTodo(todo)}
          >
            Remove
          </button>
        </div>
      ))}
      <AddTodo addTodo={todos.addTodo} />
      <button className={buttonStyles} onClick={todos.reset}>
        Reset
      </button>
    </div>
  );
};
