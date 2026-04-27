import { Router } from 'express';
import * as healthController from './controller';

const router = Router();
router.get('/', healthController.getHealth);

export const healthRouter = router;