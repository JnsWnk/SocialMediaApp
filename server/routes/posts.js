import express from "express";

import {
  getPosts,
  createPost,
  likePost,
  getById,
  commentPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getById);
router.post("/", createPost);
router.post("/:id/like", likePost);
router.post("/:id/comment", commentPost);

export default router;
