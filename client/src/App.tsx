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
    <div>
      <Posts />
    </div>
  );
}

export default App;
