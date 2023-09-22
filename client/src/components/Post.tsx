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
import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = (props) => {
  const post = props.post;
  const user = useAppSelector(userInfo);
  const liked = useAppSelector(userInfo)?.likedPosts.includes(post._id);
  const buttonClass = liked ? "bg-[#FFC107]" : "";
  const [loading, setLoading] = useState(false);

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
        <CardHeader className="">
          <Link to={`/profile/${post.userId}`} className="hover:underline">
            {post.userName}
          </Link>
        </CardHeader>
        <CardContent>
          <p>{post.message}</p>
          {post.selectedFile !== "" && (
            <img src={post.selectedFile} alt="Error loading Image" />
          )}
        </CardContent>
        <CardFooter>
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
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
