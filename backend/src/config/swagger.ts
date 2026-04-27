import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API documentation for the Portfolio backend',
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/modules/**/*.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
