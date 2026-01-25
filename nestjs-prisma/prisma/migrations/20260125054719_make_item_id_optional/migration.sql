/*
  Warnings:

  - You are about to drop the column `tokenVersion` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenVersion";

-- CreateIndex
CREATE UNIQUE INDEX "Photo_userId_key" ON "Photo"("userId");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
