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
