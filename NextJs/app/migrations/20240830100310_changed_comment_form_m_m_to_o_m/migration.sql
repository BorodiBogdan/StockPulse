-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "fk_watchListId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "StockWatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
