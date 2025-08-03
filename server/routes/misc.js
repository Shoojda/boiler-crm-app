// server/routes/misc.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// 🔄 Use a distinct route to avoid conflict with /contacts
router.get('/all-contacts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts WHERE is_deleted = 0');
    res.json(rows);
  } catch (err) {
    console.error('❌ DB Query Error:', err.message);
    res.status(500).send('Database error');
  }
});

module.exports = router;
