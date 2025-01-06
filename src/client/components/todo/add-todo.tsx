import {TodoService} from "@/client/state/todos";
import {useFormik} from "formik";
import {v4} from 'uuid';

type AddTodoProps = {
  addTodo: TodoService['addTodo'],
};

type AddTodoForm = {
  title: string,
  notes: string,
};

const initialValues = {
  title: '',
  notes: '',
} satisfies AddTodoForm;

export const AddTodo = (props: AddTodoProps) => {
  const form = useFormik({
    initialValues,
    onSubmit: (values) =>
      props.addTodo({
        id: v4(),
        title: values.title,
        notes: values.notes === "" ? undefined : values.notes,
      }),
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <label>
        <span>Title</span>
        <input id="title" name="title" type="text" onChange={form.handleChange} value={form.values.title}/>
      </label>
      <label>
        <span>Notes (optional)</span>
        <input id="notes" name="notes" type="text" onChange={form.handleChange} value={form.values.notes}/>
      </label>
      <button type="submit">Add todo</button>
  </form>
  );
};
