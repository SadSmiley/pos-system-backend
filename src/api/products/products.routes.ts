import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ParamsWithUPC } from '../../interfaces/ParamsWithUPC';
import { SearchParams } from '../../interfaces/SearchParams';

import { validateRequest } from '../../middlewares';
import * as ProductController from './products.controller';
import { Product } from './products.model';

const router = Router();

router.get('/', ProductController.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductController.findOne,
);
router.get(
  '/upc/:upc',
  validateRequest({
    params: ParamsWithUPC,
  }),
  ProductController.findByUPC,
);
router.post(
  '/',
  validateRequest({
    body: Product,
  }),
  ProductController.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Product,
  }),
  ProductController.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductController.deleteOne,
);
router.get(
  '/search/:name',
  validateRequest({
    params: SearchParams,
  }),
  ProductController.search,
);

export default router;
