import express from 'express';
import db from '../db.js'; // using mysql2/promise

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM clients');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/', async (req, res) => {
  const {
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO clients (
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        service_history, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        null, // service_history placeholder
        notes
      ]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
});

export default router;
