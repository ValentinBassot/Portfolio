import { Request, Response } from 'express';
import * as meService from './service';
import { meSchema } from './schema';

export const getMe = (req: Request, res: Response): void => {
  try {
    const meInfo = meService.getMeInfo();
    const validatedResponse = meSchema.parse(meInfo);
    res.status(200).json(validatedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};