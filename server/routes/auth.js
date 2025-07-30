const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// 🧠 Helper to generate user_code like "dsmith321"
function generateUserCode(first, last) {
  return (first[0] + last).toLowerCase() + Math.floor(Math.random() * 1000);
}

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  try {
    // Check if email already exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Generate user_code
    const user_code = generateUserCode(first_name, last_name);

    // Insert new user
    await db.query(
      `INSERT INTO users (email, password, first_name, last_name, user_code, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [email, hashed, first_name, last_name, user_code, role || 'admin']
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look up active user by email
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    const user = users[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
