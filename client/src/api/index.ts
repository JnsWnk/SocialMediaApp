import axios from "axios";

const url = import.meta.env.VITE_POSTS_URL || "";

export const getPosts = () => axios.get(url);
