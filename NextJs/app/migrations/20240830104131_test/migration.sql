/*
  Warnings:

  - You are about to drop the column `watchListId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_watchListId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "watchListId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_fkey" FOREIGN KEY ("id") REFERENCES "StockWatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
