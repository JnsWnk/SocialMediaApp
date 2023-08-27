import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

app.use("/posts", postRoutes);

// https://cloud.mongodb.com/v2/64da7be8743ecb785b1bae48#/overview
const CONN_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
