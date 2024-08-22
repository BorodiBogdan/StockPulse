/*
  Warnings:

  - You are about to drop the column `name` on the `stocks` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `stocks` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `stocks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_userId_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "name"
,
ADD COLUMN     "created_at" TIMESTAMP
(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP
(3) NOT NULL,
ALTER COLUMN "userId"
SET
NOT NULL;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;
