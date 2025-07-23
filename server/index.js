// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientRoutes from './routes/clients.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
