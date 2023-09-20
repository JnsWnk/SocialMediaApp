import { Post } from "./index";
import { useAppSelector } from "../../redux/hooks";
import { selectPosts } from "../../redux/slices/postsSlice";
import { DbPost } from "@/types/post";

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  console.log(posts);
  return (
    <div className="flex flex-col gap-4 justify-center align-middle">
      {posts.map((post: DbPost) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
