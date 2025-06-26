import { BoardMessageReply } from "@repo/client/components/board/board-message-reply.tsx";
import { TIMESTAMP_FORMAT } from "@repo/client/components/common/formatting/timestamp-format.ts";
import type { BoardMessageResponse } from "@repo/schemas/api/board/board-message.ts";
import { format } from "date-fns";

type BoardMessageProps = {
  message: BoardMessageResponse;
  boardThreadId: number;
};

export const BoardMessage = ({ message, boardThreadId }: BoardMessageProps) => (
  <li
    data-testid={`message-${message.id}`}
    className="indented-list-item"
    key={message.id}
  >
    <div className="board-message">{message.message}</div>
    <span>
      <span className="board-message-timestamp">
        Replied {format(message.createdAt, TIMESTAMP_FORMAT)} by{" "}
      </span>
      <span className="board-message-user">{message.user.name}</span>
    </span>
    {message.childMessages.length > 0 && (
      <ul className="indented-list">
        {message.childMessages.map((childMessage) => (
          <BoardMessage
            key={childMessage.id}
            message={childMessage}
            boardThreadId={boardThreadId}
          />
        ))}
      </ul>
    )}
    <BoardMessageReply
      boardThreadId={boardThreadId}
      parentMessageId={message.id}
    />
  </li>
);
