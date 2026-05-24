import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export type AuthenticatedUser = {
	id: number;
	email: string;
};

const getJwtSecret = (): string => {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT_SECRET_MISSING');
	}

	return secret;
};

const readBearerToken = (authorizationHeader: string | undefined): string | null => {
	if (!authorizationHeader) {
		return null;
	}

	const [scheme, token] = authorizationHeader.split(' ');
	if (scheme !== 'Bearer' || !token) {
		return null;
	}

	return token;
};

const isJwtPayload = (payload: string | JwtPayload): payload is JwtPayload => {
	return typeof payload !== 'string';
};

export const secure = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const token = readBearerToken(req.headers.authorization);

		if (!token) {
			res.status(401).json({ error: 'Missing or invalid authorization header' });
			return;
		}

		const decoded = jwt.verify(token, getJwtSecret());

		if (!isJwtPayload(decoded) || typeof decoded.sub !== 'number' || typeof decoded.email !== 'string') {
			res.status(401).json({ error: 'Invalid token' });
			return;
		}

		req.user = {
			id: decoded.sub,
			email: decoded.email,
		};

		next();
	} catch {
		res.status(401).json({ error: 'Invalid token' });
	}
};
