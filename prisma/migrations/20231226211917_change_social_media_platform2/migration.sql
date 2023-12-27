/*
  Warnings:

  - Added the required column `social_content_creator_id` to the `source_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "source_content_creator" DROP CONSTRAINT "source_content_creator_source_content_id_fkey";

-- AlterTable
ALTER TABLE "source_content" ADD COLUMN     "social_content_creator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "source_content_creator" ALTER COLUMN "social_media_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "source_content" ADD CONSTRAINT "source_content_social_content_creator_id_fkey" FOREIGN KEY ("social_content_creator_id") REFERENCES "source_content_creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
