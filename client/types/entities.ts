interface Post {
  title: String;
  message: String;
  author: String;
  tags: [String];
  selectedFile: String;
  likeCount: {
    type: Number;
    default: 0;
  };
  createdAt: Date;
}
