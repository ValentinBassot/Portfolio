import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { healthRouter } from './modules/health/router';
import { meRouter } from './modules/me/router';
import { authRouter } from './modules/auth/router';

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/health', healthRouter);
app.use('/me', meRouter);
app.use('/auth', authRouter);

export default app;