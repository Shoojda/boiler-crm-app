const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database_name'
});

// POST /api/clients
app.post('/api/clients', (req, res) => {
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

  const query = `
    INSERT INTO clients
    (first_name, last_name, email, phone, address, boiler_make, boiler_model, install_date, next_service_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [first_name, last_name, email, phone, address, boiler_make, boiler_model, install_date, next_service_date, notes],
    (err, result) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ success: true, id: result.insertId });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
