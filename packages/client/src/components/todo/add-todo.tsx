import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@repo/client/components/common/form/form-error.tsx";
import type { TodoService } from "@repo/client/state/use-todo-service.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

type AddTodoProps = {
  addTodo: TodoService["addTodo"];
};

const formSchema = z.object({
  title: z.string().min(5),
  notes: z.string().optional(),
});

const resolver = zodResolver(formSchema);

type AddTodoForm = z.infer<typeof formSchema>;

const defaultValues = {
  title: "",
  notes: "",
} satisfies AddTodoForm;

export const AddTodo = (props: AddTodoProps) => {
  const form = useForm<AddTodoForm>({
    mode: "onBlur",
    defaultValues,
    resolver,
  });
  const onSubmit: SubmitHandler<AddTodoForm> = (values) => {
    props.addTodo({
      id: v4(),
      title: values.title,
      notes: values.notes === "" ? undefined : values.notes,
    });
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      data-testid="add-todo-form"
      className="box flex flex-col gap-4"
    >
      <h2>Add todo</h2>
      <label className="grid grid-cols-[auto_1fr] gap-2">
        <span className="self-center">Title</span>
        <FormError error={form.formState.errors.title?.message} />
        <input className="col-span-2" type="text" {...form.register("title")} />
      </label>
      <label className="grid grid-cols-2 gap-2">
        <span className="self-center">Notes (optional)</span>
        <FormError error={form.formState.errors.notes?.message} />
        <input className="col-span-2" type="text" {...form.register("notes")} />
      </label>
      <button type="submit">Add todo</button>
    </form>
  );
};
