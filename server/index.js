import express from 'express';
import cors from 'cors';
import clientsRouter from './routes/clients.js';

const app = express();

app.use(cors({
  origin: ['https://mojklijent.web.app', 'http://localhost:3000'],
}));

app.use(express.json());
app.use('/api/clients', clientsRouter);

app.listen(10000, () => {
  console.log('Server running on port 10000');
});
