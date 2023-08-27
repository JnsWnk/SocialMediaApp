export type DbPost = {
  _id: string;
  title: string;
  message: string;
  author: string;
  tags: string[];
  selectedFile: string;
  likeCount: Number;
  createdAt: Date;
};
