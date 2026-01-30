/*
  Warnings:

  - You are about to drop the `BlockItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlockItem" DROP CONSTRAINT "BlockItem_blockListId_fkey";

-- DropForeignKey
ALTER TABLE "BlockList" DROP CONSTRAINT "BlockList_ownerId_fkey";

-- DropTable
DROP TABLE "BlockItem";

-- DropTable
DROP TABLE "BlockList";

-- DropEnum
DROP TYPE "BlockItemType";
