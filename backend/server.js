import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
//const lostItemRoutes = require('./routes/lostItemRoutes');
import lostItemRoutes from './routes/lostItemRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(express.urlencoded({ extended: true }));


// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lost-items', lostItemRoutes);

// Example protected and admin-only routes
import { authenticateToken, authorizeAdmin } from './middleware/authMiddleware.js';

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}! You accessed a protected route.` });
});

app.get('/api/admin/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: `Hello Admin ${req.user.email}, welcome to the admin dashboard.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
