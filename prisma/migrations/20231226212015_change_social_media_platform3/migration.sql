/*
  Warnings:

  - You are about to drop the column `source_content_id` on the `source_content_creator` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "source_content_creator_source_content_id_key";

-- AlterTable
ALTER TABLE "source_content_creator" DROP COLUMN "source_content_id";
