// ==========================
// ✅ IMPORTS & INITIAL SETUP
// ==========================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import pool from './config/db.js'; // ✅ MySQL pool config

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// ✅ UPLOADS DIRECTORY + MULTER
// ==========================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ==========================
// ✅ USER MODEL
// ==========================
export const userModel = {
  async create({ fullName, indexNumber, email, password, role }) {
    const [result] = await pool.query(
      'INSERT INTO students (full_name, index_number, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullName, indexNumber, email, password, role]
    );
    return result;
  },

  async findByEmailOrIndex(email, indexNumber) {
    const [rows] = await pool.query(
      'SELECT * FROM students WHERE email = ? OR index_number = ?',
      [email, indexNumber]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);
    return rows[0];
  }
};

// ==========================
// ✅ AUTH HELPERS
// ==========================
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || 'student'
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

// ==========================
// ✅ AUTH CONTROLLER
// ==========================
export const authController = {
  async signup(req, res) {
    try {
      const { fullName, indexNumber, email, password } = req.body;
      const existingUser = await userModel.findByEmailOrIndex(email, indexNumber);
      if (existingUser) return res.status(409).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        fullName,
        indexNumber,
        email,
        password: hashedPassword,
        role: 'student'
      });

      res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findByEmail(email);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = generateToken(user);

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ==========================
// ✅ AUTH MIDDLEWARE
// ==========================
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

export function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
}

// ==========================
// ✅ LOST ITEMS MODEL + ROUTES
// ==========================
const LostItem = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO lost_items 
      (item_name, description, location_lost, date_lost, time_lost, photo_path, additional_info, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.itemName,
      data.description,
      data.locationLost,
      data.dateLost,
      data.timeLost || null,
      data.photoPath || null,
      data.additionalInfo || null,
      data.userId
    ];
    pool.query(sql, values, callback);
  }
};

app.post('/api/lost-items', authenticateToken, upload.single('photo'), (req, res) => {
  const data = {
    ...req.body,
    userId: req.user.id,
    photoPath: req.file ? `/uploads/${req.file.filename}` : null
  };

  LostItem.create(data, (err) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: '✅ Lost item reported successfully' });
  });
});

// ==========================
// ✅ FOUND ITEMS MODEL + ROUTES
// ==========================
const FoundItem = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO found_items 
      (itemType, color, brand, features, location, dateFound, timeFound, contactName, contactPhone, photo, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    pool.query(
      sql,
      [
        data.itemType,
        data.color,
        data.brand,
        data.features,
        data.location,
        data.dateFound,
        data.timeFound,
        data.contactName,
        data.contactPhone,
        data.photo,
        data.userId
      ],
      callback
    );
  },

  getAll: (callback) => {
    pool.query('SELECT * FROM found_items ORDER BY created_at DESC', callback);
  }
};

app.post('/api/found-items', authenticateToken, upload.single('photo'), (req, res) => {
  const newItem = {
    ...req.body,
    photo: req.file ? `/uploads/${req.file.filename}` : null,
    userId: req.user.id
  };

  FoundItem.create(newItem, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json({ message: '✅ Found item reported successfully', id: result.insertId });
  });
});

app.get('/api/found-items', (req, res) => {
  FoundItem.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

// ==========================
// ✅ AUTH ROUTES
// ==========================
app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}! You accessed a protected route.` });
});

app.get('/api/admin/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: `Hello Admin ${req.user.email}, welcome to the admin dashboard.` });
});

// ==========================
// ✅ SERVER START
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
