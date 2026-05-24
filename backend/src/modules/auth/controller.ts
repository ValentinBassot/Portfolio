import { Request, Response } from 'express';
import * as authService from './service';
import {
  authResponseSchema,
  currentUserSchema,
  LoginInput,
  RegisterInput,
} from './schema';

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
    const payload = req.body as RegisterInput;
    const result = await authService.register(payload);
    const validatedResponse = authResponseSchema.parse(result);

    res.status(201).json(validatedResponse);
  } catch (error) {
    if (sendKnownError(error, res)) {
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body as LoginInput;
    const result = await authService.login(payload);
    const validatedResponse = authResponseSchema.parse(result);

    res.status(200).json(validatedResponse);
  } catch (error) {
    if (sendKnownError(error, res)) {
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMe = (req: Request, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const validatedResponse = currentUserSchema.parse(req.user);
    res.status(200).json(validatedResponse);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};