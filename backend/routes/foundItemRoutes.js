import express from "express";
import multer from "multer";
import path from "path";
import { reportFoundItem, getAllFoundItems } from "../controllers/foundItemController.js";




const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("photos"), reportFoundItem);
router.get("/", getAllFoundItems);









export default router;
