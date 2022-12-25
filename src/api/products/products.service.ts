import { Products, Product } from './products.model';
import { ObjectId } from 'mongodb';
import utils from 'utils';
import { CRUDService } from '../service';

import ProductCategoryService from '../productCategories/productCategories.service';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class ProductService extends CRUDService {
  constructor() {
    super(Products, Product, 'Product');
  }

  async createOne(data: Product) {
    // validate categoryId if it exists in the database
    const productCategoryService = new ProductCategoryService();
    await productCategoryService.findOne(data.categoryId);

    // check upc already exists then throw error
    await this.validateAlreadyExistUPC(data.upc);

    const result = await super.createOne(data);
      
    return result;
  }

  async updateOne(id: string, data: Product) {
    // get product data
    const productData = await this.findOne(id);

    // validate categoryId if it exists in the database
    const productCategoryService = new ProductCategoryService();
    await productCategoryService.findOne(data.categoryId);

    // check upc already exists then throw error only if upc is changed
    if (productData.upc !== data.upc) await this.validateAlreadyExistUPC(data.upc);

    const result = await super.updateOne(id, data);
    return result;
  }

  private async validateAlreadyExistUPC(upc: string | undefined) {
    if (!upc) {
      return;
    }
    const upcExists = await Products
      .find({ upc: upc },
      )
      .toArray();
    if (upcExists.length > 0) {
      throw new AppError(
        HttpErrorCode.BadRequest,
        `Product with upc "${upc}" already exists.`,
        false,
      );
    }
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

  // find product by upc
  async findByUPC(upc: string) {
    const product = await Products.findOne({
      upc,
    });
    if (!product) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `Product with upc "${upc}" not found.`,
        false,
      );
    }
    return product;
  }
}
