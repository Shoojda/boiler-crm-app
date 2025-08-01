const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/contacts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts');
    res.json(rows);
  } catch (err) {
    console.error('❌ DB Query Error:', err.message);
    res.status(500).send('Database error');
  }
});

module.exports = router;
