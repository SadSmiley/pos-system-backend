import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { SearchParams } from '../../interfaces/SearchParams';

import { validateRequest } from '../../middlewares';
import * as ProductCategoryController from './productCategories.controller';
import { ProductCategory } from './productCategories.model';

const router = Router();

router.get('/', ProductCategoryController.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductCategoryController.findOne,
);
router.post(
  '/',
  validateRequest({
    body: ProductCategory,
  }),
  ProductCategoryController.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: ProductCategory,
  }),
  ProductCategoryController.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductCategoryController.deleteOne,
);

export default router;
