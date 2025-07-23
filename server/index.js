import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientsRouter from './routes/clients.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*' // or restrict to your frontend domain in production
}));
app.use(express.json());

app.use('/api/clients', clientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
