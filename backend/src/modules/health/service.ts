import { HealthResponse } from './schema';

export const checkHealth = (): HealthResponse => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
  };
};