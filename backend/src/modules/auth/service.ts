import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { AuthResponse, LoginInput, RegisterInput } from './schema';

const SALT_ROUNDS = 10;

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET_MISSING');
  }
  return secret;
};

const buildToken = (user: { id: number; email: string }): string => {
  const jwtSecret = getJwtSecret();
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

  return jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn });
};

const buildAuthResponse = (user: { id: number; email: string; name: string | null }): AuthResponse => ({
  token: buildToken(user),
  user: {
    id: user.id,
    email: user.email,
    name: user.name,
  },
});

export const register = async (payload: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_USED');
  }

  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
  const createdUser = await prisma.user.create({
    data: {
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
    },
  });

  return buildAuthResponse(createdUser);
};

export const login = async (payload: LoginInput): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return buildAuthResponse({
    id: user.id,
    email: user.email,
    name: user.name,
  });
};