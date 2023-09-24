import { useAppDispatch } from "@./redux/hooks";
import { updatePost } from "@./redux/slices/postsSlice";
import { updateLikes } from "@./redux/slices/userSlice";
import { likeComment } from "@/api";
import { CommentType, UserType } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface PostProps {
  comment: CommentType;
  user: UserType;
}

const Comment: React.FC<PostProps> = (props) => {
  const comment = props.comment;
  const user = props.user;
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const onLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!user) {
        toast("Please log in to like a post.");
        return;
      }
      const response = await likeComment(user._id, comment._id);
      const data = await response.data;
      console.log(data);
      if (!data) {
        toast("Error liking post.");
        return;
      }
    } catch (error) {
      toast("Couldnt like post.");
    }
    setLoading(false);
  };

  return <div>{comment.message}</div>;
};

export default Comment;
