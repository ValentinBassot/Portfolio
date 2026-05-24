import type { AuthenticatedUser } from '../middleware/secure';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};