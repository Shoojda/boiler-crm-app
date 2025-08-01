const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

// ✅ Import routes
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const miscRouter = require('./routes/misc');
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
app.use(express.json());
app.options('*', cors()); // Handle preflight requests

// ✅ API Routes
app.use('/api/clients', clientsRouter);     // e.g. /api/clients/:id
app.use('/api/contacts', contactsRouter);   // e.g. /api/contacts?client_id=123
app.use('/api/misc', miscRouter);           // e.g. /api/misc/all-contacts
app.use('/api/auth', authRoutes);           // e.g. /api/auth/login

// ✅ Root health check
app.get('/', (req, res) => {
  res.send('🚀 MojKlijent API is running');
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ MojKlijent server running on port ${PORT}`);
});
