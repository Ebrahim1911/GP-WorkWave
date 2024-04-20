import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.get("/", verifyToken, getOrders);
router.post("/:gigId", verifyToken, createOrder);
export default router;
