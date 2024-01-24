/*
  Warnings:

  - Added the required column `thumbnails` to the `source_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "source_content" ADD COLUMN     "thumbnails" JSONB NOT NULL;
