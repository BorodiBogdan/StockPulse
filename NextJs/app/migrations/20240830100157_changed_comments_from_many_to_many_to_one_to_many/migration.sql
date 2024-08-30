-- Before modifying the schema, ensure that existing comments have a valid watchListId
ALTER TABLE "Comment" ADD COLUMN "watchListId" TEXT;

-- Update the existing comment to reference a valid watchListId
UPDATE "Comment" SET "watchListId" = (SELECT "id"
FROM "StockWatchList" LIMIT
1);

-- Now, alter the table to set the foreign key constraint
ALTER TABLE "Comment" ADD CONSTRAINT "fk_watchListId" FOREIGN KEY ("watchListId") REFERENCES "StockWatchList"("id");

-- Finally, modify the schema to enforce not null on watchListId
ALTER TABLE "Comment" ALTER COLUMN "watchListId"
SET
NOT NULL;
