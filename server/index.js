import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientsRouter from './routes/clients.js';

dotenv.config();
const app = express();

// ✅ Apply CORS before any routes
app.use(cors({
  origin: ['https://mojklijent.web.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use('/api/clients', clientsRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
