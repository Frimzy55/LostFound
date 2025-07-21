import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

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
















