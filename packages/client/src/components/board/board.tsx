import type { apiBaseQuery } from "@repo/client/api/api-base-query.ts";
import { api } from "@repo/client/api/api.ts";
import { BoardMessageReply } from "@repo/client/components/board/board-message-reply.tsx";
import { BoardMessage } from "@repo/client/components/board/board-message.tsx";
import { CreateBoardThread } from "@repo/client/components/board/create-board-thread.tsx";
import {
  NoWrapper,
  noQueryProps,
  withApiData,
} from "@repo/client/components/common/api/with-api-data.tsx";
import { TIMESTAMP_FORMAT } from "@repo/client/components/common/formatting/timestamp-format.ts";
import type { BoardThreadViewModel } from "@repo/schemas/api/board/board-thread.ts";
import { format } from "date-fns";

export const Board = withApiData<
  BoardThreadViewModel[],
  object,
  typeof apiBaseQuery,
  object
>(
  ({ apiResult }) => {
    return (
      <ul className="indented-list">
        <li>
          <button type="button" onClick={apiResult.refetch}>
            Reload
          </button>
        </li>
        {apiResult.data.map((thread) => (
          <li
            data-testid={`thread-${thread.id}`}
            className="indented-list-item"
            key={thread.id}
          >
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
                  <BoardMessage
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
  },
  NoWrapper,
  api.endpoints.getBoardThreads.useQuery,
  noQueryProps,
);
