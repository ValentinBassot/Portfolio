import { Request, Response } from 'express';
import * as infoService from './service';
import { infoSchema } from './schema';

export const getInfo = (req: Request, res: Response): void => {
  try {
    const info = infoService.getInfo();
    const validatedResponse = infoSchema.parse(info);
    res.status(200).json(validatedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};