import { Link } from "react-router-dom";
import { Posts } from "./components/index";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@./redux/hooks";
import { fetchPosts, selectPosts } from "@./redux/slices/postsSlice";
import { useEffect } from "react";

function App() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <Link to="/createPost" className=" fixed bottom-0 left-0 m-16">
          <Button className="w-16 h-16 rounded-xl">
            <Plus />
          </Button>
        </Link>
      </div>
      <div className="w-1/2">
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default App;
