import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createReview, getReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);

export default router;
