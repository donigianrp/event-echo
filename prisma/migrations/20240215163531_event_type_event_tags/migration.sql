/*
  Warnings:

  - You are about to drop the column `category_value` on the `event_sub_category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `event_tag` table. All the data in the column will be lost.
  - The primary key for the `event_tag_event_series` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_tag_id` on the `event_tag_event_series` table. All the data in the column will be lost.
  - The primary key for the `event_type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `event_type` table. All the data in the column will be lost.
  - The primary key for the `event_type_event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_type_id` on the `event_type_event` table. All the data in the column will be lost.
  - The primary key for the `event_type_event_series` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_type_id` on the `event_type_event_series` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[text]` on the table `event_tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `event_sub_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `event_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_tag_text` to the `event_tag_event_series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `event_type_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_category_id` to the `event_type_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `event_type_event_series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_category_id` to the `event_type_event_series` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_tag_event_series" DROP CONSTRAINT "event_tag_event_series_event_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event" DROP CONSTRAINT "event_type_event_event_type_id_fkey";

-- DropForeignKey
ALTER TABLE "event_type_event_series" DROP CONSTRAINT "event_type_event_series_event_type_id_fkey";

-- AlterTable
ALTER TABLE "event_sub_category" DROP COLUMN "category_value",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "event_tag" DROP COLUMN "title",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_tag_event_series" DROP CONSTRAINT "event_tag_event_series_pkey",
DROP COLUMN "event_tag_id",
ADD COLUMN     "event_tag_text" TEXT NOT NULL,
ADD CONSTRAINT "event_tag_event_series_pkey" PRIMARY KEY ("event_series_id", "event_tag_text");

-- AlterTable
ALTER TABLE "event_type" DROP CONSTRAINT "event_type_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "event_type_pkey" PRIMARY KEY ("category_id", "sub_category_id");

-- AlterTable
ALTER TABLE "event_type_event" DROP CONSTRAINT "event_type_event_pkey",
DROP COLUMN "event_type_id",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "sub_category_id" INTEGER NOT NULL,
ADD CONSTRAINT "event_type_event_pkey" PRIMARY KEY ("category_id", "sub_category_id", "event_id");

-- AlterTable
ALTER TABLE "event_type_event_series" DROP CONSTRAINT "event_type_event_series_pkey",
DROP COLUMN "event_type_id",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "sub_category_id" INTEGER NOT NULL,
ADD CONSTRAINT "event_type_event_series_pkey" PRIMARY KEY ("event_series_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_tag_text_key" ON "event_tag"("text");

-- AddForeignKey
ALTER TABLE "event_type_event" ADD CONSTRAINT "event_type_event_category_id_sub_category_id_fkey" FOREIGN KEY ("category_id", "sub_category_id") REFERENCES "event_type"("category_id", "sub_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sub_category" ADD CONSTRAINT "event_sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "event_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_event_series" ADD CONSTRAINT "event_type_event_series_category_id_sub_category_id_fkey" FOREIGN KEY ("category_id", "sub_category_id") REFERENCES "event_type"("category_id", "sub_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_tag_event_series" ADD CONSTRAINT "event_tag_event_series_event_tag_text_fkey" FOREIGN KEY ("event_tag_text") REFERENCES "event_tag"("text") ON DELETE RESTRICT ON UPDATE CASCADE;
