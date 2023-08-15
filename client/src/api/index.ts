import axios from "axios";

const url = process.env.REACT_APP_POSTS_URL || "";

export const getPosts = () => axios.get(url);
