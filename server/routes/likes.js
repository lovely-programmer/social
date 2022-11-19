import express from "express";
import { getLikes, createLike, deleteLike } from "../controllers/like.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", createLike);
router.delete("/", deleteLike);

export default router;