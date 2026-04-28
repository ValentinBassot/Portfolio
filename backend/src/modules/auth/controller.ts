import { Request, Response } from 'express';
import { ZodError } from 'zod';
import * as authService from './service';
import { authResponseSchema, loginSchema, registerSchema } from './schema';

const sendKnownError = (error: unknown, res: Response): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  if (error.message === 'EMAIL_ALREADY_USED') {
    res.status(409).json({ error: 'Email already used' });
    return true;
  }

  if (error.message === 'INVALID_CREDENTIALS') {
    res.status(401).json({ error: 'Invalid credentials' });
    return true;
  }

  return false;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = registerSchema.parse(req.body);
    const result = await authService.register(payload);
    const validatedResponse = authResponseSchema.parse(result);

    res.status(201).json(validatedResponse);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }

    if (sendKnownError(error, res)) {
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await authService.login(payload);
    const validatedResponse = authResponseSchema.parse(result);

    res.status(200).json(validatedResponse);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }

    if (sendKnownError(error, res)) {
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};