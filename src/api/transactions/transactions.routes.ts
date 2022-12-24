import { Router } from 'express';
import { CartBody } from '../../interfaces/CartBody';

import { validateRequest } from '../../middlewares';
import * as TransactionController from './transactions.controller';

const router = Router();

router.post(
  '/checkout',
  validateRequest({
    body: CartBody,
  }),
  TransactionController.checkout,
);

export default router;
