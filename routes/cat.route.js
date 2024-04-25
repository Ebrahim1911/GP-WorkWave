import express from "express";
const router = express.Router();
import { getAllCategories } from "../controllers/cat.conttroller.js";
router.get("/", getAllCategories);
export default router;
