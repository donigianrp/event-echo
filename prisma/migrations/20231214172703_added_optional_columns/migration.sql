/*
  Warnings:

  - You are about to drop the column `event_tag_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `has_adult_content` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `has_spam` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `event_focus_type` on the `event_series` table. All the data in the column will be lost.
  - The primary key for the `subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subscribedById` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `subscribedToId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscribed_by_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscribed_to_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_subscribedById_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_subscribedToId_fkey";

-- DropIndex
DROP INDEX "event_tag_event_series_event_series_id_key";

-- DropIndex
DROP INDEX "event_tag_event_series_event_tag_id_key";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "comments_used" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "event_tag_id",
DROP COLUMN "has_adult_content",
DROP COLUMN "has_spam",
DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "event_date_start" DROP NOT NULL,
ALTER COLUMN "event_date_finish" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event_series" DROP COLUMN "event_focus_type",
ADD COLUMN     "has_adult_content" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "has_spam" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "view_count" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event_tag" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "social_media_platform" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "source_content" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "comment_id" DROP NOT NULL,
ALTER COLUMN "view_count" DROP NOT NULL,
ALTER COLUMN "like_count" DROP NOT NULL,
ALTER COLUMN "dislike_count" DROP NOT NULL,
ALTER COLUMN "comment_count" DROP NOT NULL,
ALTER COLUMN "comments_used" DROP NOT NULL;

-- AlterTable
ALTER TABLE "source_content_creator" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pkey",
DROP COLUMN "subscribedById",
DROP COLUMN "subscribedToId",
ADD COLUMN     "subscribed_by_id" INTEGER NOT NULL,
ADD COLUMN     "subscribed_to_id" INTEGER NOT NULL,
ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscribed_to_id", "subscribed_by_id");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "body",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscribed_by_id_fkey" FOREIGN KEY ("subscribed_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscribed_to_id_fkey" FOREIGN KEY ("subscribed_to_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
