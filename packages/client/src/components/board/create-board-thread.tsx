import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@repo/client/api/api.ts";
import { withAuthenticatedOnly } from "@repo/client/components/auth/authenticated-only.tsx";

const formSchema = z.object({
  title: z.string().min(2),
  message: z.string().min(2),
});
type CreateBoardThreadForm = z.infer<typeof formSchema>;
const resolver = zodResolver(formSchema);
const defaultValues = {
  title: "",
  message: "",
} satisfies CreateBoardThreadForm;

export const CreateBoardThread = withAuthenticatedOnly(() => {
  const form = useForm<CreateBoardThreadForm>({
    mode: "onBlur",
    defaultValues,
    resolver,
  });
  const [createBoardThread] = api.endpoints.createBoardThread.useMutation();

  const onSubmit: SubmitHandler<CreateBoardThreadForm> = (values) => {
    createBoardThread({
      title: values.title,
      message: values.message,
    });
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      data-testid="add-some-data-react-hook-forms"
      className="box flex flex-col gap-4"
    >
      <label className="grid grid-cols-[auto_1fr] gap-2">
        <span className="self-center">Title</span>
        <input type="text" className="col-span-2" {...form.register("title")} />
      </label>
      <label className="grid grid-cols-[auto_1fr] gap-2">
        <span className="self-center">Message</span>
        <textarea className="col-span-2" {...form.register("message")} />
      </label>
      <button type="submit">Create thread</button>
    </form>
  );
});
