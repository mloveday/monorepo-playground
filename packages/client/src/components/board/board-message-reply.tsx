import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { javaApi } from "@repo/client/api/api.ts";

const formSchema = z.object({
  message: z.string().min(2),
});
type BoardMessageReplyForm = z.infer<typeof formSchema>;
const resolver = zodResolver(formSchema);
const defaultValues = {
  message: "",
} satisfies BoardMessageReplyForm;

type BoardMessageReplyParams = {
  boardThreadId: number;
  parentMessageId?: number;
};

export const BoardMessageReply = ({
  boardThreadId,
  parentMessageId,
}: BoardMessageReplyParams) => {
  const form = useForm<BoardMessageReplyForm>({
    mode: "onBlur",
    defaultValues,
    resolver,
  });
  const [postBoardMessageReply] =
    javaApi.endpoints.createBoardMessage.useMutation();

  const onSubmit: SubmitHandler<BoardMessageReplyForm> = (values) => {
    postBoardMessageReply({
      message: values.message,
      boardThreadId,
      parentMessageId,
    });
    form.reset();
  };

  return (
    <details>
      <summary className="self-center">Reply to message</summary>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        data-testid="add-some-data-react-hook-forms"
        className="box flex flex-col gap-4"
      >
        <label className="grid grid-cols-[auto_1fr] gap-2">
          <span className="self-center">Reply</span>
          <textarea className="col-span-2" {...form.register("message")} />
        </label>
        <button type="submit">Reply</button>
      </form>
    </details>
  );
};
