import { PostType } from "./PostForm";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = (props) => {
  const post = props.post;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.author}</p>
          {post.selectedFile !== "" && (
            <img src={post.selectedFile} alt="Error loading Image" />
          )}
          <p>{post.message}</p>
        </CardContent>
        <CardFooter>
          <p>{post.likeCount}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
