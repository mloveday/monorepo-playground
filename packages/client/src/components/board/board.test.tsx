import { Board } from "@repo/client/components/board/board.tsx";
import { TIMESTAMP_FORMAT } from "@repo/client/components/common/formatting/timestamp-format.ts";
import { withStore } from "@repo/client/test/with-store.tsx";
import { server } from "@repo/test/api/setup-server.ts";
import { boardMessageBuilder } from "@repo/test/builders/board/board-message-builder.ts";
import { boardThreadBuilder } from "@repo/test/builders/board/board-thread-builder.ts";
import { testRender } from "@repo/test/test-render.ts";
import { within } from "@testing-library/react";
import { format } from "date-fns";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

describe("Board", () => {
  const threadsURL = "http://localhost:3001/board/threads";
  const messagesURL = "http://localhost:3001/board/messages";

  it("should allow posting a thread when authenticated", async () => {
    const TestComponent = withStore(Board, true);
    server.use(http.get(threadsURL, () => HttpResponse.json([])));

    const result = testRender(<TestComponent />);

    // expect loading spinner before content is shown
    expect(await result.findByTestId("loader")).not.toBeNull();

    // should display the create thread form
    expect(await result.findByTestId("create-board-thread")).not.toBeNull();

    const thread = boardThreadBuilder.build();
    server.use(
      http.get(threadsURL, () => HttpResponse.json([thread])),
      http.post(threadsURL, () => HttpResponse.json(thread, { status: 201 })),
    );

    // post a new thread
    const createThreadForm = within(
      await result.findByTestId("create-board-thread"),
    );
    const titleTextArea: HTMLTextAreaElement =
      await createThreadForm.findByRole("textbox", { name: "Title" });
    const messageTextArea: HTMLTextAreaElement =
      await createThreadForm.findByRole("textbox", { name: "Message" });
    await result.user.type(titleTextArea, thread.title);
    await result.user.type(messageTextArea, thread.message);
    await result.user.click(
      await createThreadForm.findByRole("button", { name: "Create thread" }),
    );

    // form should be reset
    expect(titleTextArea.value).toEqual("");
    expect(messageTextArea.value).toEqual("");

    // new thread should be shown
    expect(await result.findByTestId(`thread-${thread.id}`)).not.toBeNull();
    const threadContainer = within(
      await result.findByTestId(`thread-${thread.id}`),
    );
    expect(await threadContainer.findByText(thread.title)).not.toBeNull();
    expect(await threadContainer.findByText(thread.message)).not.toBeNull();
    expect(
      await threadContainer.findByText(
        `Posted ${format(thread.createdAt, TIMESTAMP_FORMAT)} by`,
      ),
    ).not.toBeNull();
    expect(await threadContainer.findByText(thread.user.name)).not.toBeNull();
    // expect the reply to thread container to be present
    expect(
      await threadContainer.findByTestId(`reply-to-${thread.id}`),
    ).not.toBeNull();
  });

  it("should not allow posting a thread when authenticated", async () => {
    const TestComponent = withStore(Board, false);
    server.use(http.get(threadsURL, () => HttpResponse.json([])));

    const result = testRender(<TestComponent />);

    // expect loading spinner before content is shown
    expect(await result.findByTestId("loader")).not.toBeNull();

    // should not display the create thread form
    expect(await result.queryByTestId("create-board-thread")).toBeNull();
  });

  it("should load board threads and display non-interactive elements when authenticated", async () => {
    const TestComponent = withStore(Board, true);

    const thread = boardThreadBuilder.build();
    server.use(http.get(threadsURL, () => HttpResponse.json([thread])));
    const result = testRender(<TestComponent />);

    // expect loading spinner before content is shown
    expect(await result.findByTestId("loader")).not.toBeNull();

    // expect thread to be rendered in the DOM
    expect(await result.findByTestId(`thread-${thread.id}`)).not.toBeNull();
    const threadContainer = within(
      await result.findByTestId(`thread-${thread.id}`),
    );
    expect(await threadContainer.findByText(thread.title)).not.toBeNull();
    expect(await threadContainer.findByText(thread.message)).not.toBeNull();
    expect(
      await threadContainer.findByText(
        `Posted ${format(thread.createdAt, TIMESTAMP_FORMAT)} by`,
      ),
    ).not.toBeNull();
    expect(await threadContainer.findByText(thread.user.name)).not.toBeNull();
    // expect the reply to thread container to be present
    expect(
      await threadContainer.findByTestId(`reply-to-${thread.id}`),
    ).not.toBeNull();

    // expect all messages to be rendered in the DOM
    for (const message of thread.boardMessages) {
      expect(await result.findByTestId(`message-${message.id}`)).not.toBeNull();
      const messageContainer = within(
        await result.findByTestId(`message-${message.id}`),
      );
      expect(
        await messageContainer.findByText(
          `Replied ${format(message.createdAt, TIMESTAMP_FORMAT)} by`,
        ),
      ).not.toBeNull();
      expect(
        await messageContainer.findByText(message.user.name),
      ).not.toBeNull();
      // expect the reply to message container to be present
      expect(
        await messageContainer.findByTestId(
          `reply-to-${thread.id}-${message.id}`,
        ),
      ).not.toBeNull();
    }

    // expect thread reply to be present & functional
    const threadReply = boardMessageBuilder.build();
    const repliedThread = {
      ...thread,
      boardMessages: [...thread.boardMessages, threadReply],
    };
    server.use(
      http.get(threadsURL, () => HttpResponse.json([repliedThread])),
      http.post(messagesURL, () =>
        HttpResponse.json(threadReply, { status: 201 }),
      ),
    );
    const threadReplyContainer = within(
      await result.findByTestId(`reply-to-${thread.id}`),
    );
    const threadTextBox: HTMLTextAreaElement =
      await threadReplyContainer.findByRole("textbox", {
        name: "Reply",
      });
    await result.user.type(threadTextBox, threadReply.message);
    await result.user.click(
      await threadReplyContainer.findByRole("button", { name: "Reply" }),
    );
    // form should be reset after posting
    expect(threadTextBox.value).toEqual("");
    // new content should be shown
    expect(
      await threadContainer.findByText(threadReply.message),
    ).not.toBeNull();

    // expect message reply to be present & functional
    const messageReply = boardMessageBuilder
      .withParentMessageId(threadReply.id)
      .build();
    const repliedMessageThread = {
      ...repliedThread,
      boardMessages: [
        ...thread.boardMessages,
        { ...threadReply, childMessages: [messageReply] },
      ],
    };
    server.use(
      http.get(threadsURL, () => HttpResponse.json([repliedMessageThread])),
      http.post(messagesURL, () =>
        HttpResponse.json(messageReply, { status: 201 }),
      ),
    );
    const messageReplyContainer = within(
      await result.findByTestId(`reply-to-${thread.id}-${threadReply.id}`),
    );
    const messageTextBox: HTMLTextAreaElement =
      await messageReplyContainer.findByRole("textbox", { name: "Reply" });
    await result.user.type(messageTextBox, messageReply.message);
    await result.user.click(
      await messageReplyContainer.findByRole("button", { name: "Reply" }),
    );
    // form should be reset after posting
    expect(messageTextBox.value).toEqual("");
    // new content should be shown
    expect(
      await threadContainer.findByText(messageReply.message),
    ).not.toBeNull();
  });

  it("should load board threads and not display non-interactive elements when anonymous", async () => {
    const TestComponent = withStore(Board, false);

    const thread = boardThreadBuilder.build();
    server.use(http.get(threadsURL, () => HttpResponse.json([thread])));
    const result = testRender(<TestComponent />);

    // expect loading spinner before content is shown
    expect(await result.findByTestId("loader")).not.toBeNull();

    // expect thread to be rendered in the DOM
    expect(await result.findByTestId(`thread-${thread.id}`)).not.toBeNull();
    const threadContainer = within(
      await result.findByTestId(`thread-${thread.id}`),
    );
    expect(await threadContainer.findByText(thread.title)).not.toBeNull();
    expect(await threadContainer.findByText(thread.message)).not.toBeNull();
    expect(
      await threadContainer.findByText(
        `Posted ${format(thread.createdAt, TIMESTAMP_FORMAT)} by`,
      ),
    ).not.toBeNull();
    expect(await threadContainer.findByText(thread.user.name)).not.toBeNull();

    // reply not available to anonymous users
    expect(await result.queryByTestId(`reply-to-${thread.id}`)).toBeNull();

    // expect all messages to be rendered in the DOM
    for (const message of thread.boardMessages) {
      expect(await result.findByTestId(`message-${message.id}`)).not.toBeNull();
      const messageContainer = within(
        await result.findByTestId(`message-${message.id}`),
      );
      expect(
        await messageContainer.findByText(
          `Replied ${format(message.createdAt, TIMESTAMP_FORMAT)} by`,
        ),
      ).not.toBeNull();
      expect(
        await messageContainer.findByText(message.user.name),
      ).not.toBeNull();

      // reply not available to anonymous users
      expect(
        await result.queryByTestId(`reply-to-${thread.id}-${message.id}`),
      ).toBeNull();
    }
  });

  it("should show an error when fetching board threads fails", async () => {
    const TestComponent = withStore(Board, true);
    server.use(http.get(threadsURL, HttpResponse.error));

    const result = testRender(<TestComponent />);

    expect(await result.findByText("There was an error loading this content.")).not.toBeNull();
  });
});
