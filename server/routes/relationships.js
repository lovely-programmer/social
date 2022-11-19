import express from "express";
import { getRelationships, createRelationship, deleteRelationship } from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", createRelationship);
router.delete("/", deleteRelationship);

export default router;