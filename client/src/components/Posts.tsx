import { Post } from "./index";
import { useAppSelector } from "../../redux/hooks";
import { selectPosts } from "../../redux/slices/postsSlice";
import { DbPost } from "@/types/post";

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  console.log(posts);
  return (
    <div>
      <h1> Posts </h1>
      {posts.map((post: DbPost) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
