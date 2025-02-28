export interface YoutubeVideoDetails {
  title: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
  channel: ChannelDetails;
  publishedAt: string;
}

export interface ChannelDetails {
  title: string;
  subscribers: string;
  thumbnail: string;
}
