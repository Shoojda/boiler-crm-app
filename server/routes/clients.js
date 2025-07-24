import express from 'express';
import db from '../db.js';

const router = express.Router();

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

router.post('/', (req, res) => {
  const {
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  const query = `
    INSERT INTO clients (first_name, last_name, email, phone, address, boiler_make, boiler_model, install_date, next_service_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  ], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database insert error' });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

export default router;
