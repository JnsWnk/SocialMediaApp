import { useAppDispatch, useAppSelector } from "@./redux/hooks";
import { updatePost } from "@./redux/slices/postsSlice";
import { userInfo, updateLikes } from "@./redux/slices/userSlice";
import { likePost } from "@/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostType } from "@/types";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RelativeTime from "./ui/relativeTime";
import Comment from "./Comment";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = (props) => {
  const post = props.post;
  const user = useAppSelector(userInfo);
  const liked = useAppSelector(userInfo)?.likedPosts.includes(post._id);
  const buttonClass = liked ? "bg-[#FFC107]" : "";
  const [loading, setLoading] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const dispatch = useAppDispatch();

  const onLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!user) {
        toast("Please log in to like a post.");
        return;
      }
      const response = await likePost(user._id, post._id);
      const data = await response.data;
      if (!data) {
        toast("Error liking post.");
        return;
      }
      dispatch(updatePost({ newPost: data.post }));
      dispatch(updateLikes({ likedPosts: data.likedPosts }));
    } catch (error) {
      toast("Couldnt like post.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <Link to={`/profile/${post.userId}`} className="hover:underline">
            {post.userName}
          </Link>
          <RelativeTime date={new Date(post.createdAt)} />
        </CardHeader>
        <CardContent>
          <p>{post.message}</p>
          {post.selectedFile !== "" && (
            <img src={post.selectedFile} alt="Error loading Image" />
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-5 items-start">
          <div className="flex flex-row gap-2 font-semibold items-center">
            <button
              onClick={() => onLike()}
              className={`p-2 rounded-full ${buttonClass} hover:bg-gray-200`}
            >
              <ThumbsUp className="w-6 h-6" />
            </button>

            <div className="flex items-center">
              <span className="mr-1">{post.likeCount}</span>
              <span className="text-gray-500">Likes</span>
            </div>
            <button
              onClick={() => setCommentsVisible(!commentsVisible)}
              className="ml-2 flex gap-2 rounded-xl p-2 border border-transparent hover:border-gray-500"
            >
              <MessageCircle className="w-6 h-6" /> <span>Comments </span>
            </button>
          </div>

          {commentsVisible && (
            <div className="w-full">
              <form className="flex">
                <Textarea placeholder="Message..." id="message" />
                <Button type="submit">Post</Button>
              </form>
              {post.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} user={user} />
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
