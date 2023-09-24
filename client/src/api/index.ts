import axios from "axios";

const posts_url = import.meta.env.VITE_POSTS_URL || "";
const users_url = import.meta.env.VITE_USERS_URL || "";
const comments_url = import.meta.env.VITE_COMMENTS_URL || "";

export const fetchPosts = () => axios.get(posts_url);

export const fetchUserPosts = (userId: string) =>
  axios.get(users_url + "/" + userId + "/getPosts");

export const createPost = (post: FormData) => axios.post(posts_url, post);

export const likePost = (userId: string, postId: string) =>
  axios.post(posts_url + "/" + postId + "/like", { userId });

export const likeComment = (userId: string, commentId: string) =>
  axios.post(comments_url + "/" + commentId + "/like", { userId });

export const registerUser = (userData: FormData) =>
  axios.post(users_url + "/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const loginUser = (userData: { email: String; password: String }) =>
  axios.post(users_url + "/login", userData);

export const getUser = (userId: string) => axios.get(users_url + "/" + userId);

export const followUser = (userIds: { selfId: string; followId: string }) =>
  axios.post(users_url + "/follow", userIds);

export const updateBio = (userId: string, bio: string) =>
  axios.patch(users_url + "/" + userId + "/updateBio", { bio });

export const updatePassword = (
  userId: string,
  value: { currentPw: string; newPw: string }
) => axios.patch(users_url + "/" + userId + "/updatePassword", value);

export const commentPost = (userId: string, postId: string, message: string) =>
  axios.post(posts_url + "/" + postId + "/comment", { userId, message });
