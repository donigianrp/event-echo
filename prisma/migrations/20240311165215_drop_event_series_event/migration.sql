/*
  Warnings:

  - You are about to drop the `event_series_event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_position` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_series_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_series_event" DROP CONSTRAINT "event_series_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_series_event" DROP CONSTRAINT "event_series_event_event_series_id_fkey";

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "event_position" INTEGER NOT NULL,
ADD COLUMN     "event_series_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "event_series_event";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
