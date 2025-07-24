import express from 'express';
import db from '../db.js';

const router = express.Router();

// ✅ Get all clients
router.get('/', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// ✅ Get all contacts (if needed separately)
router.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

export default router;
