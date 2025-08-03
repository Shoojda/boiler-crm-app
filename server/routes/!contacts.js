const express = require('express');
const db = require('../db');

const router = express.Router();

// ✅ Get all non-deleted contacts for a client
router.get('/', async (req, res) => {
  const clientId = req.query.client_id;

  if (!clientId) {
    return res.status(400).json({ error: 'Missing client_id' });
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM contacts WHERE client_id = ? AND is_deleted = 0',
      [clientId]
    );
    res.json(results);
  } catch (err) {
    console.error('GET /contacts error:', err);
    res.status(500).json({ error: 'Database fetch error' });
  }
});

// ✅ Create new contact
router.post('/', async (req, res) => {
  const { client_id, name, email, phone } = req.body;

  if (!client_id || !name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (client_id, name, email, phone) are required.' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO contacts (client_id, name, email, phone, is_deleted)
       VALUES (?, ?, ?, ?, 0)`,
      [client_id, name, email, phone]
    );

    res.status(201).json({ id: result.insertId, message: 'Contact added successfully' });
  } catch (err) {
    console.error('POST /contacts error:', err);
    res.status(500).json({ error: 'Database insert error' });
  }
});

// ✅ Soft-delete contact
router.delete('/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const [result] = await db.query(
      'UPDATE contacts SET is_deleted = 1 WHERE id = ?',
      [contactId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact soft-deleted' });
  } catch (err) {
    console.error('DELETE /contacts/:id error:', err);
    res.status(500).json({ error: 'Database delete error' });
  }
});

module.exports = router;
