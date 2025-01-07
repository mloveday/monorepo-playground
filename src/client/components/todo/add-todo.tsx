import { useFormik } from "formik";
import { v4 } from "uuid";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { FormError } from "@/client/components/common/form/form-error";
import { formHasErrors } from "@/client/lib/form-has-errors";
import { TodoService } from "@/client/state/todos";

type AddTodoProps = {
  addTodo: TodoService["addTodo"];
};

const formSchema = z.object({
  title: z.string().min(5),
  notes: z.string().optional(),
});

const validationSchema = toFormikValidationSchema(formSchema);

type AddTodoForm = z.infer<typeof formSchema>;

const initialValues = {
  title: "",
  notes: "",
} satisfies AddTodoForm;

export const AddTodo = (props: AddTodoProps) => {
  const form = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: (values, formikHelpers) => {
      props.addTodo({
        id: v4(),
        title: values.title,
        notes: values.notes === "" ? undefined : values.notes,
      });
      formikHelpers.resetForm();
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="box flex flex-col gap-4">
      <h2>Add todo</h2>
      <label className="grid grid-cols-2 gap-2">
        <span className="self-center">Title</span>
        <input
          name="title"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.title}
        />
      </label>
      <FormError error={form.errors.title} />
      <label className="grid grid-cols-2 gap-2">
        <span className="self-center">Notes (optional)</span>
        <input
          name="notes"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.notes}
        />
      </label>
      <FormError error={form.errors.notes} />
      <button disabled={formHasErrors(form.errors)} type="submit">
        Add todo
      </button>
    </form>
  );
};
