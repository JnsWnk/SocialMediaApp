export type PostType = {
  _id: string;
  userId: String;
  userName: String;
  message: string;
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
  comments: CommentType[];
};

export type UserType = {
  _id: string;
  name: string;
  bio: string;
  email: string;
  image: {
    _id: string;
    image: string;
  };
  friends: string[];
  likedPosts: string[];
} | null;

export type CommentType = {
  _id: string;
  authorId: string;
  postId: string;
  message: string;
  likes: number;
  comments: CommentType[];
  createdAt: Date;
};
