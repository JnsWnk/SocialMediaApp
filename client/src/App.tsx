import { Navbar, Posts, Form } from "./components/index";
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
      <Navbar />
      <div id="postgrid" className="flex justify-center gap-3">
        <div className="w-3/5">
          <Posts />
        </div>
        <div className="w-1/3">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
