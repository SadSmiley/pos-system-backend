import { Products, Product } from './products.model';
import { ObjectId } from 'mongodb';
import utils from 'utils';
import Service from '../service';

import ProductCategoryService from '../productCategories/productCategories.service';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class ProductService extends Service {
  constructor() {
    super(Products, Product);
  }

  async createOne(data: Product) {
    // validate categoryId if it exists in the database
    if (data.categoryId) {
      const productCategoryService = new ProductCategoryService();
      try {
        await productCategoryService.findOne(data.categoryId);
      } catch (e) {
        if (e instanceof AppError && e.httpCode === HttpErrorCode.NotFound) {
          throw new AppError(
            HttpErrorCode.NotFound,
            `Product category with id "${data.categoryId}" not found.`,
            false,
          );
        }
      }
    }

    const result = await super.createOne(data);
      
    return result;
  }

  async search(query: string) {
    // create index for text search
    await Products.createIndex({ name: 'text' });

    const products = await Products.find({
      $text: { $search: query.toLowerCase().trim() },
    }).toArray();
    return products;
  }

  // update product quantity
  async updateQuantity(id: string, quantity: number) {
    const result = await Products.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $inc: { countInStock: -quantity },
      },
      {
        returnDocument: 'after',
      },
    );
    if (!result.value) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `Product with id "${id}" not found.`,
        false,
      );
    }
    return result;
  }

  // validate product quantity
  async validateQuantity(id: string, quantity: number) {
    const product =
      this.cachedData[id] ||
      (await Products.findOne({
        _id: new ObjectId(id),
      }));
    if (!product) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `Product with id "${id}" not found.`,
        false,
      );
    }
    if (product.countInStock < quantity) {
      throw new AppError(
        HttpErrorCode.BadRequest,
        `Product with id "${id}" is out of stock.`,
        false,
      );
    }
  }
}
