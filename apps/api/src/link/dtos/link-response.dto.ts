export interface LinkResponse {
  id: number;
  url: string;
  shortenedUrl: string;
  createdAt: Date;
  deleted: boolean;
  userId: number;
}
