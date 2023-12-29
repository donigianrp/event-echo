/*
  Warnings:

  - Added the required column `social_media_platform_id` to the `source_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "social_media_platform" DROP CONSTRAINT "social_media_platform_source_content_id_fkey";

-- AlterTable
ALTER TABLE "source_content" ADD COLUMN     "social_media_platform_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "source_content" ADD CONSTRAINT "source_content_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
