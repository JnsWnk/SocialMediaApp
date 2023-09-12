import { PostType } from "@/components/PostForm";
import axios from "axios";

const posts_url = import.meta.env.VITE_POSTS_URL || "";
const users_url = import.meta.env.VITE_USERS_URL || "";

export const fetchPosts = () => axios.get(posts_url);

export const createPost = (post: PostType) => axios.post(posts_url, post);

export const updateUser = (userData: FormData) =>
  axios.post(users_url, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
