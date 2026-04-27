import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { healthRouter } from './modules/health/router';
import { meRouter } from './modules/me/router';

dotenv.config({ path: '../.env' });

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/health', healthRouter);
app.use('/me', meRouter);

export default app;