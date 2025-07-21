// Converted to ES Module format
import express from 'express';
import multer from 'multer';
import path from 'path';
import { reportLostItem } from '../controllers/lostItemController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/report', upload.single('photo'), reportLostItem);

export default router;
