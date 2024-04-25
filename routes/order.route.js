import express from "express";
import {
  createOrder,
  getOrders,
  geAllOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.get("/", verifyToken, getOrders);
router.post("/:gigId", verifyToken, createOrder);
router.get("/getAllOrders", verifyToken, geAllOrders);
export default router;
