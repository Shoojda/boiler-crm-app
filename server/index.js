// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

// ✅ Import routes
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const miscRouter = require('./routes/misc');       // ✅ Misc (safe debug routes)
const authRoutes = require('./routes/auth');

// ✅ Initialize express app
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Debug MySQL connection details
console.log('🔌 Connecting to MySQL with:');
console.log(`  Host: ${process.env.DB_HOST}`);
console.log(`  User: ${process.env.DB_USER}`);
console.log(`  Database: ${process.env.DB_NAME}`);

// ✅ Middleware
app.use(cors({
  origin: 'https://mojklijent.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());
app.use(express.json()); // Parse incoming JSON
app.options('*', cors()); // Handle preflight

// ✅ API Routes
app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/misc', miscRouter); // Mounted as /api/misc/all-contacts

// ✅ Root endpoint
app.get('/', (req, res) => res.send('🚀 MojKlijent API is running'));

// ✅ 404 Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ MojKlijent server running on port ${PORT}`);
});
