/*
  Warnings:

  - You are about to drop the column `comments` on the `StockWatchList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockWatchList" DROP COLUMN "comments";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_fkey" FOREIGN KEY ("id") REFERENCES "StockWatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
