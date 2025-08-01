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

// 🔍 Input validator for signup
function validateSignupInput({ email, password, first_name, last_name }) {
  return email && password && first_name && last_name;
}

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  if (!validateSignupInput(req.body)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user_code = generateUserCode(first_name, last_name);

    await db.query(
      `INSERT INTO users (email, password, first_name, last_name, user_code, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [email, hashed, first_name, last_name, user_code, role || 'admin']
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Internal server error during signup' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    const user = users[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        user_code: user.user_code
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

module.exports = router;
