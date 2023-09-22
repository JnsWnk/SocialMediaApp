import { Post } from "./index";
import { PostType } from "@/types";

const Posts = (props: { posts: PostType[] }) => {
  return (
    <div className="flex flex-col gap-4 justify-center align-middle">
      {props.posts.map((post: PostType) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
