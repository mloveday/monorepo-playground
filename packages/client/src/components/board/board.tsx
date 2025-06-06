import { javaApi } from "@repo/client/api/api.ts";
import type { BoardMessageResponse } from "@repo/schemas/api/board/board-thread.ts";
import { BoardMessageReply } from "@repo/client/components/board/board-message-reply.tsx";

type BoardMessageProps = {
  message: BoardMessageResponse;
  boardThreadId: number;
};

const Message = ({ message, boardThreadId }: BoardMessageProps) => {
  return (
    <li className="indented-list-item" key={message.id}>
      <div className="board-message">{message.message}</div>
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
    return <div>Failed to get board</div>;
  }
  return (
    <ul className="indented-list">
      {response.data.map((thread) => (
        <li className="indented-list-item" key={thread.id}>
          <h3>{thread.title}</h3>
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
    </ul>
  );
};
