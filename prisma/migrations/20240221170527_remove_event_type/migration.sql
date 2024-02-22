/*
  Warnings:

  - You are about to drop the `event_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_type_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_type_event_series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event_sub_category" DROP CONSTRAINT "event_sub_category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type" DROP CONSTRAINT "event_type_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type" DROP CONSTRAINT "event_type_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event" DROP CONSTRAINT "event_type_event_category_id_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event" DROP CONSTRAINT "event_type_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event_series" DROP CONSTRAINT "event_type_event_series_category_id_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event_series" DROP CONSTRAINT "event_type_event_series_event_series_id_fkey";

-- AlterTable
ALTER TABLE "event_series" ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "sub_category_id" INTEGER;

-- AlterTable
ALTER TABLE "event_sub_category" ALTER COLUMN "category_id" DROP NOT NULL;

-- DropTable
DROP TABLE "event_type";

-- DropTable
DROP TABLE "event_type_event";

-- DropTable
DROP TABLE "event_type_event_series";

-- AddForeignKey
ALTER TABLE "event_sub_category" ADD CONSTRAINT "event_sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "event_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_series" ADD CONSTRAINT "event_series_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "event_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_series" ADD CONSTRAINT "event_series_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "event_sub_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
