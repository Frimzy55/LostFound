import pool from '../config/db.js';

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






////////////////////////////
