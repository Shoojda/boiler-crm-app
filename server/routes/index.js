import cors from 'cors';
import express from 'express';
import cors from 'cors';
import clientsRouter from './routes/clients.js';


const express = require('express');
const router = express.Router();
const db = require('../db');


app.use(cors({
  origin: 'https://mojklijent.web.app'
}));



const app = express();

// ✅ FIX CORS HERE
app.use(cors({
  origin: ['https://mojklijent.web.app', 'http://localhost:3000']
}));

app.use(express.json());
app.use('/api/clients', clientsRouter);

// ✅ Make sure your server starts
app.listen(10000, () => {
  console.log('Server running on port 10000');
});

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
