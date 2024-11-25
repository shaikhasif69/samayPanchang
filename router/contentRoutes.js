import express from "express";
import { createAarti, getAllAartis, getAartiById, updateAarti, deleteAarti } from "../controllers/contentController.js";
import upload from "../helpers/multer.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/aarti",
  authMiddleware, 
  upload.fields([{ name: "image" }, { name: "audio" }]), 
  createAarti
);

router.get("/aarti", authMiddleware, getAllAartis); 

router.get("/aarti/:id", authMiddleware, getAartiById);

router.put(
  "/aarti/:id",
  authMiddleware, 
  upload.fields([{ name: "image" }, { name: "audio" }]),
  updateAarti
);

router.delete("/aarti/:id", authMiddleware, deleteAarti); 

export default router;
