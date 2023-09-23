import express from "express";

import {
  getUser,
  login,
  register,
  follow,
  updateBio,
  updatePassword,
  getUserPosts,
} from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/follow", follow);
router.patch("/:id/updateBio", updateBio);
router.patch("/:id/updatePassword", updatePassword);
router.get("/:id/getPosts", getUserPosts);

export default router;
