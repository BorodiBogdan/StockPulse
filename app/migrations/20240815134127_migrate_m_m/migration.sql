/*
  Warnings:

  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_userId_fkey";

-- DropTable
DROP TABLE "stocks";

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StockToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "_StockToUser_AB_unique" ON "_StockToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StockToUser_B_index" ON "_StockToUser"("B");

-- AddForeignKey
ALTER TABLE "_StockToUser" ADD CONSTRAINT "_StockToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToUser" ADD CONSTRAINT "_StockToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
