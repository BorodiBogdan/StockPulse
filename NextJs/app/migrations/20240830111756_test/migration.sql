/*
  Warnings:

  - You are about to drop the column `username` on the `StockWatchList` table. All the data in the column will be lost.
  - You are about to drop the `_StockToStockWatchList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,stockId]` on the table `StockWatchList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `watchListId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `StockWatchList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `StockWatchList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_fkey";

-- DropForeignKey
ALTER TABLE "StockWatchList" DROP CONSTRAINT "StockWatchList_username_fkey";

-- DropForeignKey
ALTER TABLE "_StockToStockWatchList" DROP CONSTRAINT "_StockToStockWatchList_A_fkey";

-- DropForeignKey
ALTER TABLE "_StockToStockWatchList" DROP CONSTRAINT "_StockToStockWatchList_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "watchListId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StockWatchList" DROP COLUMN "username",
ADD COLUMN     "stockId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_StockToStockWatchList";

-- CreateIndex
CREATE UNIQUE INDEX "StockWatchList_userId_stockId_key" ON "StockWatchList"("userId", "stockId");

-- AddForeignKey
ALTER TABLE "StockWatchList" ADD CONSTRAINT "StockWatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockWatchList" ADD CONSTRAINT "StockWatchList_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "StockWatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
