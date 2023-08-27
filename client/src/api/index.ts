import { PostType } from "@/components/PostForm";
import axios from "axios";

const url = import.meta.env.VITE_POSTS_URL || "";

export const fetchPosts = () => axios.get(url);

export const createPost = (post: PostType) => axios.post(url, post);
