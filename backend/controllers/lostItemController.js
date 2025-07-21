// Converted to ES Module format
import path from 'path';
import LostItem from '../models/LostItem.js';

export const reportLostItem = (req, res) => {
  const data = req.body;
  const file = req.file;

  const photoPath = file ? `/uploads/${file.filename}` : null;

  LostItem.create({ ...data, photoPath }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: 'Lost item reported successfully' });
  });
};
