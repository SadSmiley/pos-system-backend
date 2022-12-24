import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import products from './products/products.routes';
import transactions from './transactions/transactions.routes';
import productCategories from './productCategories/productCategories.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/products', products);
router.use('/transactions', transactions);
router.use('/productCategories', productCategories);

export default router;
