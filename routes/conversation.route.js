import express from "express";
import { fnTest } from "../controllers/conversation.controller.js";
const router = express.Router();
router.get("/test", fnTest);
export default router;
