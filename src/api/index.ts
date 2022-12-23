import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import products from './products/products.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/products', products);

export default router;
