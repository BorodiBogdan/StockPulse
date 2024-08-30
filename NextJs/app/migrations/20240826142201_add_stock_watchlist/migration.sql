-- CreateTable
CREATE TABLE "StockWatchList" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockWatchList_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "StockWatchList" ADD CONSTRAINT "StockWatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToStockWatchList" ADD CONSTRAINT "_StockToStockWatchList_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToStockWatchList" ADD CONSTRAINT "_StockToStockWatchList_B_fkey" FOREIGN KEY ("B") REFERENCES "StockWatchList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
