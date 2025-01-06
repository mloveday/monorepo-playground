import {useTodoState} from "@/client/state/todos";

// basic TODO app
export const SampleEphemeralStateComponent = () => {
  // note: any state management should not be done inside components if at all possible.
  // custom hooks can do what we need and make testing _much_ simpler
  const todos = useTodoState();
  return (
    <div>
      <h2>Todo app with ephemeral state</h2>
      {todos.state.todos.length === 0}
      {todos.state.todos.map(todo => <div key={todo.id}>
        <h3>{todo.title}</h3>
        <p>{todo.notes}</p>
        <button onClick={() => todos.removeTodo(todo)}>Remove</button>
      </div>)}
      <button onClick={todos.reset}>Reset</button>
    </div>
  );
};
