// server/routes/clients.js
const express = require('express');
const db = require('../db');
const { format } = require('date-fns');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to format dates for MySQL
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    return format(new Date(dateStr), 'yyyy-MM-dd');
  } catch {
    return null;
  }
};

// Defensive helper for getting user id
function getUserId(req) {
  return req.user && (req.user.user_id || req.user.id);
}

// ✅ GET all active clients for a specific user
router.get('/', authenticateToken, async (req, res) => {
  const userId = getUserId(req);
  const search = req.query.search || '';

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const [results] = await db.query(
      `
      SELECT * FROM clients
      WHERE user_id = ?
        AND is_deleted = 0
        AND (
          first_name LIKE ? OR
          last_name LIKE ? OR
          email LIKE ? OR
          phone LIKE ? OR
          boiler_make LIKE ? OR
          boiler_model LIKE ?
        )
      `,
      [userId, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
    );
    res.json(results);
  } catch (err) {
    console.error('[GET /clients] DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ SEARCH clients
router.get('/search', authenticateToken, async (req, res) => {
  const userId = getUserId(req);
  const query = req.query.query;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const likeQuery = `%${query}%`;
    const [results] = await db.query(
      `
      SELECT * FROM clients
      WHERE user_id = ? AND is_deleted = 0 AND (
        first_name LIKE ? OR last_name LIKE ? OR
        email LIKE ? OR phone LIKE ? OR
        boiler_make LIKE ? OR boiler_model LIKE ?
      )
      `,
      [userId, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery]
    );
    res.json(results);
  } catch (err) {
    console.error('[SEARCH /clients] DB error:', err);
    res.status(500).json({ error: 'Database search error' });
  }
});

// ✅ GET client by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = getUserId(req);

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const [results] = await db.query(
      'SELECT * FROM clients WHERE id = ? AND user_id = ? AND is_deleted = 0',
      [id, userId]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Client not found or not authorized' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('[GET /clients/:id] DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ CREATE new client
router.post('/', authenticateToken, async (req, res) => {
  const userId = getUserId(req);
  let {
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  install_date = formatDate(install_date);
  next_service_date = formatDate(next_service_date);

  try {
    const [result] = await db.query(
      `
      INSERT INTO clients (
        user_id,
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        service_history, notes, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `,
      [
        userId, first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date, next_service_date,
        null, notes
      ]
    );
    res.status(201).json({ id: result.insertId, user_id: userId, ...req.body });
  } catch (err) {
    console.error('[POST /clients] DB error:', err);
    res.status(500).json({ error: 'Database insert error' });
  }
});

// ✅ UPDATE existing client
router.put('/:id', authenticateToken, async (req, res) => {
  const {
    first_name, last_name, email, phone,
    address, boiler_make, boiler_model,
    install_date, next_service_date, notes
  } = req.body;
  const { id } = req.params;
  const userId = getUserId(req);

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const [result] = await db.query(
      `
      UPDATE clients SET
        first_name = ?, last_name = ?, email = ?, phone = ?,
        address = ?, boiler_make = ?, boiler_model = ?,
        install_date = ?, next_service_date = ?, notes = ?
      WHERE id = ? AND user_id = ?
      `,
      [
        first_name, last_name, email, phone,
        address, boiler_make, boiler_model,
        install_date || null, next_service_date || null, notes,
        id, userId
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found or unauthorized' });
    }
    res.json({ message: 'Client updated successfully' });
  } catch (err) {
    console.error('[PUT /clients/:id] DB error:', err);
    res.status(500).json({ error: 'Database update error' });
  }
});

// ✅ SOFT DELETE client
router.delete('/:id', authenticateToken, async (req, res) => {
  const clientId = req.params.id;
  const userId = getUserId(req);

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const [result] = await db.query(
      'UPDATE clients SET is_deleted = 1 WHERE id = ? AND user_id = ?',
      [clientId, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found or access denied' });
    }
    res.json({ success: true, message: 'Client soft-deleted' });
  } catch (err) {
    console.error('[DELETE /clients/:id] DB error:', err);
    res.status(500).json({ error: 'Database delete error' });
  }
});

// ✅ ADD SERVICE ENTRY to a client's service history
router.post('/:id/add-service', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = getUserId(req);
  const { notes, images = [] } = req.body;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  const now = new Date();
  const serviceEntry = {
    date: format(now, 'yyyy-MM-dd'),
    datetime: now.toISOString(),
    notes: notes || '',
    images: Array.isArray(images) ? images : []
  };

  try {
    const [rows] = await db.query(
      'SELECT service_history FROM clients WHERE id = ? AND user_id = ? AND is_deleted = 0',
      [id, userId]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Client not found or unauthorized' });

    let history = [];
    try {
      history = JSON.parse(rows[0].service_history || '[]');
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }

    history.push(serviceEntry);

    await db.query('UPDATE clients SET service_history = ? WHERE id = ?', [JSON.stringify(history), id]);

    res.json({ success: true, new_entry: serviceEntry, service_history: history });
  } catch (err) {
    console.error('[POST /clients/:id/add-service] Error:', err);
    res.status(500).json({ error: 'Database error adding service entry' });
  }
});



module.exports = router;
