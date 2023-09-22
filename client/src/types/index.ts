export type PostType = {
  _id: string;
  userId: String;
  userName: String;
  message: string;
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  imageId: string;
  image: string;
  friends: string[];
  likedPosts: string[];
} | null;
