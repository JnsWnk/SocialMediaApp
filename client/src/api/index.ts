import axios from "axios";

const posts_url = import.meta.env.VITE_POSTS_URL || "";
const users_url = import.meta.env.VITE_USERS_URL || "";

export const fetchPosts = () => axios.get(posts_url);

export const createPost = (post: FormData) => axios.post(posts_url, post);

export const registerUser = (userData: FormData) =>
  axios.post(users_url + "/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const loginUser = (userData: { email: String; password: String }) =>
  axios.post(users_url + "/login", userData);
