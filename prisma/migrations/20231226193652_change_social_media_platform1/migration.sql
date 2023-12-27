/*
  Warnings:

  - You are about to drop the column `source_content_id` on the `social_media_platform` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "social_media_platform_source_content_id_key";

-- AlterTable
ALTER TABLE "social_media_platform" DROP COLUMN "source_content_id";
