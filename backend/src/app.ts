import express from 'express';
import dotenv from 'dotenv';
import { healthRouter } from './modules/health/router';

dotenv.config({ path: '../.env' });

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/health', healthRouter);

export default app;