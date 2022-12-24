import { Products, Product } from './products.model';
import { ObjectId } from 'mongodb';
import utils from 'utils';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class ProductService {
  cachedData: { [key: string]: Product };

  constructor() {
    this.cachedData = {};
  }

  async findAll() {
    const products = await Products.find().toArray();
    return products;
  }

  async createOne(data: Product) {
    const insertResult = await Products.insertOne(data);
    if (!insertResult.acknowledged)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Error inserting product.',
        false,
      );
    return insertResult;
  }

  async findOne(id: string) {
    let result = await Products.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `Product with id "${id}" not found.`,
        false,
      );
    }
    this.cachedData[result._id.toString()] = result;
    return result;
  }

  async updateOne(id: string, data: Product) {
    const result = await Products.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
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

  async deleteOne(id: string) {
    const result = await Products.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!result.value) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `Product with id "${id}" not found.`,
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
}
