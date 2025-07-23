const express = require('express');
const router = express.Router();
const db = require('../db');
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://mojklijent.web.app'
}));

// Example GET endpoint
router.get('/api/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
