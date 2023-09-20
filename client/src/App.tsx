import { Posts } from "./components/index";
import { useAppDispatch } from "../redux/hooks";
import { fetchPosts } from "../redux/slices/postsSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <Posts />
      </div>
    </div>
  );
}

export default App;
