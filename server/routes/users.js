import express from "express";

import { getUser, login, register } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/register", register);
router.post("/login", login);

export default router;
