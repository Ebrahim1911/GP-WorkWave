import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  getSellerGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/delete/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/:id", getSellerGigs);

export default router;
