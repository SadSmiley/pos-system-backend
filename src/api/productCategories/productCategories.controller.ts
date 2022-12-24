import { Response, Request, NextFunction } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ProductCategoryWithId, ProductCategory } from './productCategories.model';

import ProductCategorieservice from './productCategories.service';
const ProductCategorieserviceInstance = new ProductCategorieservice();

export async function findAll(
  req: Request,
  res: Response<ProductCategoryWithId[]>,
  next: NextFunction,
) {
  try {
    const productCategories = await ProductCategorieserviceInstance.findAll();
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
    const insertResult = await ProductCategorieserviceInstance.createOne(req.body);
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
    const result = await ProductCategorieserviceInstance.findOne(req.params.id);
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
    const result = await ProductCategorieserviceInstance.updateOne(
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
    await ProductCategorieserviceInstance.deleteOne(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function search(
  req: Request<{ name: string }, ProductCategoryWithId[], {}>,
  res: Response<ProductCategoryWithId[]>,
  next: NextFunction,
) {
  try {
    const productCategories = await ProductCategorieserviceInstance.search(req.params.name);
    res.json(productCategories);
  } catch (error) {
    next(error);
  }
}
