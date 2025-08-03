// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const db = require('./db'); // make sure this path is correct

// 🔌 ROUTES
const authRoutes = require('./routes/auth');
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const miscRouter = require('./routes/misc');

// 🌍 MIDDLEWARE
app.use(cors({
  origin: 'https://mojklijent.web.app', // ✅ Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());
app.use(express.json());
app.options('*', cors()); // Handle preflight

// 📦 API ROUTES
app.use('/api/auth', authRoutes);
//app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/misc', miscRouter);

// 🧪 Root endpoint for testing
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// ✅ DB Connection Test
db.query('SELECT 1')
  .then(() => console.log('✅ DB connection OK'))
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    process.exit(1); // Exit on DB failure
  });

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// 🧯 Error Handling
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});
