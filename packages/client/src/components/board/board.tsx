import { javaApi } from "@repo/client/api/api.ts";
import type { BoardMessageResponse } from "@repo/schemas/api/board/board-thread.ts";
import { BoardMessageReply } from "@repo/client/components/board/board-message-reply.tsx";
import { format } from "date-fns";
import { CreateBoardThread } from "@repo/client/components/board/create-board-thread.tsx";

type BoardMessageProps = {
  message: BoardMessageResponse;
  boardThreadId: number;
};

const TIMESTAMP_FORMAT = "PPpp";

const Message = ({ message, boardThreadId }: BoardMessageProps) => {
  return (
    <li className="indented-list-item" key={message.id}>
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
            <Message
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
};

export const Board = () => {
  const response = javaApi.endpoints.getBoardThreads.useQuery({});
  if (response.isLoading) {
    return <div>Loading</div>;
  }
  if (!response.isSuccess) {
    return (
      <div>
        Failed to get board
        <button type="button" onClick={response.refetch}>
          Reload
        </button>
      </div>
    );
  }
  return (
    <ul className="indented-list">
      <li>
        <button type="button" onClick={response.refetch}>
          Reload
        </button>
      </li>
      {response.data.map((thread) => (
        <li className="indented-list-item" key={thread.id}>
          <h3>{thread.title}</h3>
          <span>
            <span className="board-message-timestamp">
              Posted {format(thread.createdAt, TIMESTAMP_FORMAT)} by{" "}
            </span>
            <span className="board-message-user">{thread.user.name}</span>
          </span>
          <div className="board-message">{thread.message}</div>
          {thread.boardMessages.length > 0 && (
            <ul className="indented-list">
              {thread.boardMessages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  boardThreadId={thread.id}
                />
              ))}
            </ul>
          )}
          <BoardMessageReply boardThreadId={thread.id} />
        </li>
      ))}
      <CreateBoardThread />
    </ul>
  );
};
