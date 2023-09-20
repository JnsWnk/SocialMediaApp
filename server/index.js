import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

import { register } from "./controllers/users.js";
import { createPost } from "./controllers/posts.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    fieldSize: 5 * 1024 * 1024, // 5MB
  },
});

//Routes with files
app.post("/users/register", upload.single("image"), register);
app.post("/posts", upload.single("image"), createPost);

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// https://cloud.mongodb.com/v2/64da7be8743ecb785b1bae48#/overview
const CONN_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
