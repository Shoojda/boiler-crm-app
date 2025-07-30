const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

console.log('🔌 Connecting to MySQL with:');
console.log(`  Host: ${process.env.DB_HOST}`);
console.log(`  User: ${process.env.DB_USER}`);
console.log(`  Database: ${process.env.DB_NAME}`);

// ✅ Security headers
app.use(helmet());

// ✅ CORS
app.use(cors({
  origin: ['https://mojklijent.web.app', 'http://localhost:3000'],
  credentials: true
}));

// ✅ JSON parser
app.use(express.json());

// ✅ Routes
app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRoutes);

// ✅ Root ping
app.get('/', (req, res) => res.send('🚀 MojKlijent API is running'));

// ✅ 404 fallback
app.use((req, res) => res.status(404).json({ message: 'API route not found' }));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ MojKlijent server running on port ${PORT}`);
});
