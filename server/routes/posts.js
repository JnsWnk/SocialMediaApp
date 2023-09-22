import express from "express";

import {
  getPosts,
  createPost,
  likePost,
  getUserPosts,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/like", likePost);
router.get("/user/:id", getUserPosts);

export default router;
