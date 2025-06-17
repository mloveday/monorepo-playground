-- DropForeignKey
ALTER TABLE "board_message" DROP CONSTRAINT "board_message_parent_message_id_fkey";

-- AlterTable
ALTER TABLE "board_message" ALTER COLUMN "parent_message_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "board_message_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "board_message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
