import { useFormik } from "formik";
import { v4 } from "uuid";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { FormError } from "@/components/common/form/form-error";
import { formHasErrors } from "@/lib/form-has-errors";
import type { TodoService } from "@/state/use-todo-service";

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

export const AddTodoFormik = (props: AddTodoProps) => {
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
    <form
      onSubmit={form.handleSubmit}
      data-testid="add-todo-formik"
      className="box flex flex-col gap-4"
    >
      <h2>Add todo (Formik)</h2>
      <label className="grid grid-cols-2 gap-2">
        <span className="self-center">Title</span>
        <FormError error={form.errors.title} />
        <input
          className="col-span-2"
          name="title"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.title}
        />
      </label>
      <label className="grid grid-cols-2 gap-2">
        <span className="self-center">Notes (optional)</span>
        <FormError error={form.errors.notes} />
        <input
          className="col-span-2"
          name="notes"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.notes}
        />
      </label>
      <button disabled={formHasErrors(form.errors)} type="submit">
        Add todo
      </button>
    </form>
  );
};
