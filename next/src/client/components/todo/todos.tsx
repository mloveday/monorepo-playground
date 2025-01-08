import { AddTodo } from "@/client/components/todo/add-todo";
import { useTodoService } from "@/client/state/use-todo-service";

// basic TODO app
export const Todos = () => {
  // note: any state management should not be done inside components if at all possible.
  // custom hooks can do what we need and make testing _much_ simpler
  const todos = useTodoService();
  return (
    <div className="flex flex-col gap-4">
      <h2>Todo app with ephemeral state</h2>
      {todos.state.todos.length === 0 && (
        <p className="box text-gray-400">
          You have nothing to do! You can add tasks in the form below.
        </p>
      )}
      {todos.state.todos.map((todo) => (
        <div className="box flex flex-col gap-2" key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.notes}</p>
          <button onClick={() => todos.removeTodo(todo)}>Remove</button>
        </div>
      ))}
      <AddTodo addTodo={todos.addTodo} />
      <button onClick={todos.reset}>Reset</button>
    </div>
  );
};
