import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate = (schema: ZodTypeAny, target: ValidationTarget = 'body') => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req[target]);

		if (!result.success) {
			res.status(400).json({ error: 'Validation error', details: result.error.issues });
			return;
		}

		req[target] = result.data;
		next();
	};
};
