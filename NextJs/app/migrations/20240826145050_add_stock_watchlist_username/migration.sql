/*
  Warnings:

  - You are about to drop the column `stockId` on the `StockWatchList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StockWatchList` table. All the data in the column will be lost.
  - Added the required column `username` to the `StockWatchList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StockWatchList" DROP CONSTRAINT "StockWatchList_userId_fkey";

-- AlterTable
ALTER TABLE "StockWatchList" DROP COLUMN "stockId",
DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StockWatchList" ADD CONSTRAINT "StockWatchList_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
