import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients', details: err.message });
  }
});

// POST a new client
router.post('/', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      boiler_make,
      boiler_model,
      install_date,
      next_service_date,
      notes
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO clients 
        (first_name, last_name, email, phone, address, boiler_make, boiler_model, install_date, next_service_date, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, address, boiler_make, boiler_model, install_date, next_service_date, notes]
    );

    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create client', details: err.message });
  }
});

export default router;
