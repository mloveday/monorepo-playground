-- CreateTable
CREATE TABLE "user" (
    "sub" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("sub")
);

-- CreateTable
CREATE TABLE "board_thread" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_sub" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "board_thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "user_sub" TEXT NOT NULL,
    "board_thread_id" INTEGER NOT NULL,
    "parent_message_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "board_message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "board_thread" ADD CONSTRAINT "board_thread_user_sub_fkey" FOREIGN KEY ("user_sub") REFERENCES "user"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "board_message_user_sub_fkey" FOREIGN KEY ("user_sub") REFERENCES "user"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "board_message_board_thread_id_fkey" FOREIGN KEY ("board_thread_id") REFERENCES "board_thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "board_message_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "board_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
