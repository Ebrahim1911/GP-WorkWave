import express from "express";
import {
  deleteUser,
  getUser,
  geAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/", verifyToken, geAllUsers);
router.get("/:id", verifyToken, getUser);
export default router;
