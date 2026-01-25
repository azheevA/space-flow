-- DropForeignKey
ALTER TABLE "BlockList" DROP CONSTRAINT "BlockList_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "BlockList" ADD CONSTRAINT "BlockList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
