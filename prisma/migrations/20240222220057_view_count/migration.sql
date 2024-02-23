/*
  Warnings:

  - Made the column `view_count` on table `event_series` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event_series" ALTER COLUMN "view_count" SET NOT NULL,
ALTER COLUMN "view_count" SET DEFAULT 0;
