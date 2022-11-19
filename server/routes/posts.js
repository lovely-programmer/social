import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

router.delete("/:id", deletePost);

export default router;
