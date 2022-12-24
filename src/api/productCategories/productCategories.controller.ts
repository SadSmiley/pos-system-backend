import { Response, Request, NextFunction } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ProductCategoryWithId, ProductCategory } from './productCategories.model';

import ProductCategoryService from './productCategories.service';
const ProductCategoryServiceInstance = new ProductCategoryService();

export async function findAll(
  req: Request,
  res: Response<ProductCategoryWithId[]>,
  next: NextFunction,
) {
  try {
    const productCategories = await ProductCategoryServiceInstance.findAll();
    res.json(productCategories);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, ProductCategoryWithId, ProductCategory>,
  res: Response<ProductCategoryWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await ProductCategoryServiceInstance.createOne(req.body);
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, ProductCategoryWithId, {}>,
  res: Response<ProductCategoryWithId>,
  next: NextFunction,
) {
  try {
    const result = await ProductCategoryServiceInstance.findOne(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, ProductCategoryWithId, ProductCategory>,
  res: Response<ProductCategoryWithId | null>,
  next: NextFunction,
) {
  try {
    const result = await ProductCategoryServiceInstance.updateOne(
      req.params.id,
      req.body,
    );
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    await ProductCategoryServiceInstance.deleteOne(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}