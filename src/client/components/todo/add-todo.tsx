import {TodoService} from "@/client/state/todos";
import {useFormik} from "formik";
import {v4} from 'uuid';
import {buttonStyles} from "@/client/components/common/button";

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
    <form onSubmit={form.handleSubmit} className="border rounded-md p-4 flex flex-col gap-4">
      <h2 className="font-bold text-xl">Add todo</h2>
      <label className="grid grid-cols-2 gap-4">
        <span className="self-center">Title</span>
        <input id="title" name="title" type="text" onChange={form.handleChange} value={form.values.title} className="border p-2"/>
      </label>
      <label className="grid grid-cols-2 gap-4">
        <span className="self-center">Notes (optional)</span>
        <input id="notes" name="notes" type="text" onChange={form.handleChange} value={form.values.notes} className="border p-2"/>
      </label>
      <button className={buttonStyles} type="submit">Add todo</button>
  </form>
  );
};
