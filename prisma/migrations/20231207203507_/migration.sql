-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_date_start" TIMESTAMP(3) NOT NULL,
    "event_date_finish" TIMESTAMP(3) NOT NULL,
    "event_tag_id" INTEGER NOT NULL,
    "has_adult_content" BOOLEAN NOT NULL,
    "has_spam" BOOLEAN NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "view_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "dislike_count" INTEGER NOT NULL,
    "comment_count" INTEGER NOT NULL,
    "comments_used" INTEGER NOT NULL,

    CONSTRAINT "source_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content_event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "source_content_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_series_event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,
    "event_position" INTEGER NOT NULL,

    CONSTRAINT "event_series_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type_event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "event_type_id" INTEGER NOT NULL,

    CONSTRAINT "event_type_event_pkey" PRIMARY KEY ("id")
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
    "title" TEXT NOT NULL,

    CONSTRAINT "event_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_sub_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "event_sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type_event_series" (
    "id" SERIAL NOT NULL,
    "event_series_id" INTEGER NOT NULL,
    "event_type_id" INTEGER NOT NULL,

    CONSTRAINT "event_type_event_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "view_count" INTEGER NOT NULL,
    "event_focus_type" TEXT NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "event_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_content_creator" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "social_media_platform_id" INTEGER NOT NULL,
    "social_media_id" INTEGER NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "source_content_creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media_platform" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "social_media_platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comments_used" INTEGER NOT NULL,
    "contents" TEXT NOT NULL,
    "source_content_id" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tag" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "subscribedById" INTEGER NOT NULL,
    "subscribedToId" INTEGER NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("subscribedToId","subscribedById")
);

-- CreateTable
CREATE TABLE "user_series_like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,

    CONSTRAINT "user_series_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_series_favorite" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_series_id" INTEGER NOT NULL,

    CONSTRAINT "user_series_favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventEventTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "source_content_creator_source_content_id_key" ON "source_content_creator"("source_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_platform_source_content_id_key" ON "social_media_platform"("source_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_source_content_id_key" ON "comment"("source_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EventEventTag_AB_unique" ON "_EventEventTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventEventTag_B_index" ON "_EventEventTag"("B");

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
ALTER TABLE "event_series" ADD CONSTRAINT "event_series_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content_creator" ADD CONSTRAINT "source_content_creator_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_content_creator" ADD CONSTRAINT "source_content_creator_source_content_id_fkey" FOREIGN KEY ("source_content_id") REFERENCES "source_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media_platform" ADD CONSTRAINT "social_media_platform_source_content_id_fkey" FOREIGN KEY ("source_content_id") REFERENCES "source_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_source_content_id_fkey" FOREIGN KEY ("source_content_id") REFERENCES "source_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media_tag" ADD CONSTRAINT "social_media_tag_social_media_platform_id_fkey" FOREIGN KEY ("social_media_platform_id") REFERENCES "social_media_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_subscribedById_fkey" FOREIGN KEY ("subscribedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_subscribedToId_fkey" FOREIGN KEY ("subscribedToId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_like" ADD CONSTRAINT "user_series_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_like" ADD CONSTRAINT "user_series_like_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_favorite" ADD CONSTRAINT "user_series_favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_favorite" ADD CONSTRAINT "user_series_favorite_event_series_id_fkey" FOREIGN KEY ("event_series_id") REFERENCES "event_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEventTag" ADD CONSTRAINT "_EventEventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "event_series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEventTag" ADD CONSTRAINT "_EventEventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "event_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
