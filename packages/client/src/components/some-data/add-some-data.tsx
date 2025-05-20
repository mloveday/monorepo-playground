import { zodResolver } from "@hookform/resolvers/zod";
import { usePostSomeData } from "@repo/client/api/endpoints/some-data/use-post-some-data.ts";
import { FormError } from "@repo/client/components/common/form/form-error.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(2),
});
type AddSomeDataForm = z.infer<typeof formSchema>;
const resolver = zodResolver(formSchema);
const defaultValues = {
  message: "",
} satisfies AddSomeDataForm;

export const AddSomeData = () => {
  const form = useForm<AddSomeDataForm>({
    mode: "onBlur",
    defaultValues,
    resolver,
  });
  const [postSomeData] = usePostSomeData();

  const onSubmit: SubmitHandler<AddSomeDataForm> = (values) => {
    postSomeData({ message: values.message });
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      data-testid="add-some-data-react-hook-forms"
      className="box flex flex-col gap-4"
    >
      <h2>Add SomeData</h2>
      <label className="grid grid-cols-[auto_1fr] gap-2">
        <span className="self-center">Message</span>
        <FormError error={form.formState.errors.message?.message} />
        <input
          className="col-span-2"
          type="text"
          {...form.register("message")}
        />
      </label>
      <button type="submit">Add SomeData</button>
    </form>
  );
};
