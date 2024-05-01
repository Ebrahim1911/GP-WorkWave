import express from "express";
import {
  postUserFavorites,
  getUserFavorites,
} from "../controllers/favorites.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.post("/:gigId", verifyToken, postUserFavorites);
router.get("/", verifyToken, getUserFavorites);

export default router;
