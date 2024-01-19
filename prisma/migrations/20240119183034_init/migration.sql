-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "event_date_start" TIMESTAMP(3),
    "event_date_finish" TIMESTAMP(3),
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "content_id" TEXT,
    "channel_id" TEXT,
    "title" TEXT,
    "view_count" INTEGER,
    "like_count" INTEGER,
    "dislike_count" INTEGER,
    "comment_count" INTEGER,
    "comments_used" INTEGER,
    "social_media_platform_id" INTEGER NOT NULL,
    "social_content_creator_id" INTEGER NOT NULL,

    CONSTRAINT "source_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content_event" (
    "event_id" INTEGER NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "source_content_event_pkey" PRIMARY KEY ("source_content_id","event_id")
);

-- CreateTable
CREATE TABLE "event_series_event" (
    "event_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,
    "event_position" INTEGER NOT NULL,

    CONSTRAINT "event_series_event_pkey" PRIMARY KEY ("event_series_id","event_id")
);

-- CreateTable
CREATE TABLE "event_type_event" (
    "event_id" INTEGER NOT NULL,
    "event_type_id" INTEGER NOT NULL,

    CONSTRAINT "event_type_event_pkey" PRIMARY KEY ("event_type_id","event_id")
);

-- CreateTable
CREATE TABLE "event_type" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "sub_category_id" INTEGER NOT NULL,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_category" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "event_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_sub_category" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category_value" TEXT NOT NULL,

    CONSTRAINT "event_sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type_event_series" (
    "event_series_id" INTEGER NOT NULL,
    "event_type_id" INTEGER NOT NULL,

    CONSTRAINT "event_type_event_series_pkey" PRIMARY KEY ("event_series_id","event_type_id")
);

-- CreateTable
CREATE TABLE "event_tag_event_series" (
    "event_series_id" INTEGER NOT NULL,
    "event_tag_id" INTEGER NOT NULL,

    CONSTRAINT "event_tag_event_series_pkey" PRIMARY KEY ("event_series_id","event_tag_id")
);

-- CreateTable
CREATE TABLE "event_series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "view_count" INTEGER,
    "creator_id" INTEGER NOT NULL,
    "has_adult_content" BOOLEAN NOT NULL DEFAULT true,
    "has_spam" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "event_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content_creator" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "social_media_platform_id" INTEGER NOT NULL,
    "social_media_id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "source_content_creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media_platform" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "social_media_platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comments_used" INTEGER,
    "contents" TEXT NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tag" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "event_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media_tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "social_media_platform_id" INTEGER NOT NULL,

    CONSTRAINT "social_media_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
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
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "status" TEXT DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "subscribed_by_id" INTEGER NOT NULL,
    "subscribed_to_id" INTEGER NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscribed_to_id","subscribed_by_id")
);

-- CreateTable
CREATE TABLE "user_series_like" (
    "user_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,

    CONSTRAINT "user_series_like_pkey" PRIMARY KEY ("user_id","event_series_id")
);

-- CreateTable
CREATE TABLE "user_series_favorite" (
    "user_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,

    CONSTRAINT "user_series_favorite_pkey" PRIMARY KEY ("user_id","event_series_id")
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
CREATE UNIQUE INDEX "comment_source_content_id_key" ON "comment"("source_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content" ADD CONSTRAINT "source_content_social_content_creator_id_fkey" FOREIGN KEY ("social_content_creator_id") REFERENCES "source_content_creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content" ADD CONSTRAINT "source_content_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content_event" ADD CONSTRAINT "source_content_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content_event" ADD CONSTRAINT "source_content_event_source_content_id_fkey" FOREIGN KEY ("source_content_id") REFERENCES "source_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_series_event" ADD CONSTRAINT "event_series_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_series_event" ADD CONSTRAINT "event_series_event_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_event" ADD CONSTRAINT "event_type_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_event" ADD CONSTRAINT "event_type_event_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type" ADD CONSTRAINT "event_type_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "event_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type" ADD CONSTRAINT "event_type_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "event_sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_event_series" ADD CONSTRAINT "event_type_event_series_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_event_series" ADD CONSTRAINT "event_type_event_series_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_tag_event_series" ADD CONSTRAINT "event_tag_event_series_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_tag_event_series" ADD CONSTRAINT "event_tag_event_series_event_tag_id_fkey" FOREIGN KEY ("event_tag_id") REFERENCES "event_tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_series" ADD CONSTRAINT "event_series_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content_creator" ADD CONSTRAINT "source_content_creator_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_source_content_id_fkey" FOREIGN KEY ("source_content_id") REFERENCES "source_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media_tag" ADD CONSTRAINT "social_media_tag_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "user_series_like" ADD CONSTRAINT "user_series_like_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_favorite" ADD CONSTRAINT "user_series_favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_favorite" ADD CONSTRAINT "user_series_favorite_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
