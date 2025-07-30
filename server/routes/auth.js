const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // your mysql2 db pool
require('dotenv').config();

// Helper: Generate user_code
function generateUserCode(first, last) {
  return (first[0] + last).toLowerCase() + Math.floor(Math.random() * 1000);
}

// ✅ Signup route
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user_code = generateUserCode(first_name, last_name);

    await db.query(
      `INSERT INTO users (email, password, first_name, last_name, user_code, role, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [email, hashed, first_name, last_name, user_code, role || 'admin', 1]
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );
    const user = users[0];
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

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
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});


module.exports = router;
