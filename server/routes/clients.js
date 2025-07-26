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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const [results] = await db.query(
      'SELECT * FROM clients WHERE id = ? AND user_id = ? AND is_deleted = 0',
      [id, user_id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'Client not found or not authorized' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
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

// Get a specific client by ID and user_id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const [results] = await db.query(
      'SELECT * FROM clients WHERE id = ? AND user_id = ? AND is_deleted = 0',
      [id, user_id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  const {
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const [result] = await db.query(
      `UPDATE clients SET
        first_name = ?, last_name = ?, email = ?, phone = ?,
        address = ?, boiler_make = ?, boiler_model = ?,
        install_date = ?, next_service_date = ?, notes = ?
      WHERE id = ? AND user_id = ?`,
      [
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date || null, next_service_date || null, notes,
        id, user_id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found or not authorized' });
    }

    res.json({ message: 'Client updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database update error' });
  }
});


// Soft-delete client
router.delete('/:id', async (req, res) => {
  const clientId = req.params.id;
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user_id' });
  }

  try {
    const [result] = await db.query(
      'UPDATE clients SET is_deleted = 1 WHERE id = ? AND user_id = ?',
      [clientId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found or access denied' });
    }

    res.json({ success: true, message: 'Client deleted (soft-delete)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete error' });
  }
});


export default router;
