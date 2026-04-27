import { Request, Response } from 'express';
import * as healthService from './service';
import { healthSchema } from './schema';

export const getHealth = (req: Request, res: Response): void => {
  try {
    const healthStatus = healthService.checkHealth();
    
    const validatedResponse = healthSchema.parse(healthStatus);
    
    res.status(200).json(validatedResponse);
  } 
  
    catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });  
  }

};