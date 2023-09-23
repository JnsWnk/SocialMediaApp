import express from "express";

import {
  getPosts,
  createPost,
  likePost,
  getById,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getById);
router.post("/", createPost);
router.post("/:id/like", likePost);

export default router;
