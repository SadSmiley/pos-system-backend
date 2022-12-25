import { Response, Request, NextFunction } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ParamsWithUPC } from '../../interfaces/ParamsWithUPC';
import { ProductWithId, Product } from './products.model';

import ProductService from './products.service';
const ProductServiceInstance = new ProductService();

export async function findAll(
  req: Request,
  res: Response<ProductWithId[]>,
  next: NextFunction,
) {
  try {
    const products = await ProductServiceInstance.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, ProductWithId, Product>,
  res: Response<ProductWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await ProductServiceInstance.createOne(req.body);
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
  req: Request<ParamsWithId, ProductWithId, {}>,
  res: Response<ProductWithId>,
  next: NextFunction,
) {
  try {
    const result = await ProductServiceInstance.findOne(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, ProductWithId, Product>,
  res: Response<ProductWithId | null>,
  next: NextFunction,
) {
  try {
    const result = await ProductServiceInstance.updateOne(
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
    await ProductServiceInstance.deleteOne(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function search(
  req: Request<{ name: string }, ProductWithId[], {}>,
  res: Response<ProductWithId[]>,
  next: NextFunction,
) {
  try {
    const products = await ProductServiceInstance.search(req.params.name);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function findByUPC(req: Request<{}, ProductWithId, ParamsWithUPC>, res: Response<ProductWithId>, next: NextFunction) {
  try {
    const products = await ProductServiceInstance.findByUPC(req.body.upc);
    res.json(products);
  }
  catch (error) {
    next(error);
  }
}