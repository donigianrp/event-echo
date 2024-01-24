interface YouTubeSearchResp {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeSnippet;
}

interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface YouTubeCommentResp {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeCommentSnippet;
}

interface YouTubeCommentSnippet {
  channelId: string;
  videoId: string;
  title: string;
  canReply: boolean;
  channelTitle: string;
  totalReplyCount: number;
  isPublic: boolean;
  topLevelComment: Comment;
}

interface Comment {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    channelId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    moderationStatus: string;
    publishedAt: datetime;
    updatedAt: datetime;
  };
}

interface CommentsReq {
  id: number;
  ytCommentId: string;
  videoId: string;
  title: string;
  textOriginal: string;
  textDisplay: string;
}

// ------------------------- EVENT SERIES MODEL ---------------------

export interface EventSeriesModel {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  is_private: boolean;
  view_count: number | null;
  creator_id: number;
  has_adult_content: boolean;
  has_spam: boolean;
}

// ------------------------- EVENT MODEL ---------------------

export interface EventModel {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string | null;
  event_date_start: Date | null;
  event_date_finish: Date | null;
  creator_id: number;
}

// ------------------------- CATEGORY MODEL ---------------------
export interface CategoryModel {
  id: number;
  value: string;
  label: string;
}

// ------------------------- SUB CATEGORY MODEL ---------------------

export interface SubCategoryModel {
  id: number;
  value: string;
  label: string;
  category_value: string;
}
