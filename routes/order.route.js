import express from "express";
import { fnTest } from "../controllers/order.controller.js";
const router = express.Router();
router.get("/test", fnTest);
export default router;
