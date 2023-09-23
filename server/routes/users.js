import express from "express";

import { getUser, login, register, follow } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/follow", follow);

export default router;
