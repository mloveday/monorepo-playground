import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBoardMessage } from "@repo/client/api/endpoints/board/use-create-board-message.ts";
import { withAuthenticatedOnly } from "@repo/client/components/auth/authenticated-only.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

export const BoardMessageReply = withAuthenticatedOnly(
  ({ boardThreadId, parentMessageId }: BoardMessageReplyParams) => {
    const form = useForm<BoardMessageReplyForm>({
      mode: "onBlur",
      defaultValues,
      resolver,
    });
    const [postBoardMessageReply] = useCreateBoardMessage();

    const onSubmit: SubmitHandler<BoardMessageReplyForm> = (values) => {
      postBoardMessageReply({
        message: values.message,
        boardThreadId,
        parentMessageId,
      });
      form.reset();
    };

    return (
      <details
        data-testid={`reply-to-${boardThreadId}${parentMessageId ? `-${parentMessageId}` : ""}`}
      >
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
  },
);
