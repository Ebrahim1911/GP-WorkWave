import express from "express";
import { fnTest } from "../controllers/message.controller.js";
const router = express.Router();
router.get("/test", fnTest);
export default router;
