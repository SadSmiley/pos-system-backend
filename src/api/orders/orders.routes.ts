import { Router } from 'express';
import * as OrdersController from './orders.controller';

const router = Router();

router.get('/number', OrdersController.getOrdersNumber);

export default router;
