export interface User {
    pseudo: string;
    email: string;
    password?: string;
  }
  
  export interface AuthToken {
    pseudo: string;
    email: string;
  }
  
  export interface Playlist {
    id: string;
    name: string;
  }
  
  export interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    viewCount: number;
    publishedAt: Date;
  }