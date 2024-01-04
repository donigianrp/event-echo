/*
  Warnings:

  - The primary key for the `subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_series_favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_series_like` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "event_series" DROP CONSTRAINT "event_series_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_subscribed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_subscribed_to_id_fkey";

-- DropForeignKey
ALTER TABLE "user_series_favorite" DROP CONSTRAINT "user_series_favorite_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_series_like" DROP CONSTRAINT "user_series_like_user_id_fkey";

-- DropIndex
DROP INDEX "user_user_name_key";

-- AlterTable
ALTER TABLE "event_series" ALTER COLUMN "creator_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pkey",
ALTER COLUMN "subscribed_by_id" SET DATA TYPE TEXT,
ALTER COLUMN "subscribed_to_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscribed_to_id", "subscribed_by_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "status",
DROP COLUMN "user_name",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "user_series_favorite" DROP CONSTRAINT "user_series_favorite_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_series_favorite_pkey" PRIMARY KEY ("user_id", "event_series_id");

-- AlterTable
ALTER TABLE "user_series_like" DROP CONSTRAINT "user_series_like_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_series_like_pkey" PRIMARY KEY ("user_id", "event_series_id");

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "event_series" ADD CONSTRAINT "event_series_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscribed_by_id_fkey" FOREIGN KEY ("subscribed_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscribed_to_id_fkey" FOREIGN KEY ("subscribed_to_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_like" ADD CONSTRAINT "user_series_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_favorite" ADD CONSTRAINT "user_series_favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
