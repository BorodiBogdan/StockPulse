/*
  Warnings:

  - You are about to drop the column `stockId` on the `StockWatchList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StockWatchList` table. All the data in the column will be lost.
  - Added the required column `username` to the `StockWatchList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StockWatchList" DROP CONSTRAINT "StockWatchList_stockId_fkey";

-- DropForeignKey
ALTER TABLE "StockWatchList" DROP CONSTRAINT "StockWatchList_userId_fkey";

-- DropIndex
DROP INDEX "StockWatchList_userId_stockId_key";

-- AlterTable
ALTER TABLE "StockWatchList" DROP COLUMN "stockId",
DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_StockToStockWatchList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StockToStockWatchList_AB_unique" ON "_StockToStockWatchList"("A", "B");

-- CreateIndex
CREATE INDEX "_StockToStockWatchList_B_index" ON "_StockToStockWatchList"("B");

-- AddForeignKey
ALTER TABLE "StockWatchList" ADD CONSTRAINT "StockWatchList_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToStockWatchList" ADD CONSTRAINT "_StockToStockWatchList_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToStockWatchList" ADD CONSTRAINT "_StockToStockWatchList_B_fkey" FOREIGN KEY ("B") REFERENCES "StockWatchList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
