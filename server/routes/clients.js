import express from 'express';
import db from '../db.js';

const router = express.Router();

// ✅ GET all active clients for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const [results] = await db.query(
      'SELECT * FROM clients WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// ✅ POST new client
router.post('/', async (req, res) => {
  const {
    user_id,
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO clients (
        user_id,
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        service_history, notes,
        is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        null, notes,
        0 // is_deleted = false
      ]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
});

// ✅ PUT (update) specific client — secured by user_id
router.put('/:id', async (req, res) => {
  const clientId = req.params.id;
  const {
    user_id,
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id' });
  }

  try {
    const [result] = await db.query(
      `UPDATE clients SET
        first_name = ?, last_name = ?, email = ?, phone = ?,
        address = ?, boiler_make = ?, boiler_model = ?,
        install_date = ?, next_service_date = ?, notes = ?
       WHERE id = ? AND user_id = ? AND is_deleted = 0`,
      [
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date, notes,
        clientId, user_id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found or not authorized' });
    }

    res.json({ message: 'Client updated successfully' });
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Database update error' });
  }
});

export default router;
