import { ProductCategories, ProductCategory } from './productCategories.model';
import { ObjectId } from 'mongodb';
import utils from 'utils';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class ProductCategoriesService {
  cachedData: { [key: string]: ProductCategory };

  constructor() {
    this.cachedData = {};
  }

  async findAll() {
    const productCategories = await ProductCategories.find().toArray();
    return productCategories;
  }

  async createOne(data: ProductCategory) {
    const insertResult = await ProductCategories.insertOne(data);
    if (!insertResult.acknowledged)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Error inserting productCategory.',
        false,
      );
    return insertResult;
  }

  async findOne(id: string) {
    let result = await ProductCategories.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `ProductCategory with id "${id}" not found.`,
        false,
      );
    }
    this.cachedData[result._id.toString()] = result;
    return result;
  }

  async updateOne(id: string, data: ProductCategory) {
    const result = await ProductCategories.findOneAndUpdate(
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
        `ProductCategory with id "${id}" not found.`,
        false,
      );
    }
    return result;
  }

  async deleteOne(id: string) {
    const result = await ProductCategories.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!result.value) {
      throw new AppError(
        HttpErrorCode.NotFound,
        `ProductCategory with id "${id}" not found.`,
        false,
      );
    }
  }

  async search(query: string) {
    // create index for text search
    await ProductCategories.createIndex({ name: 'text' });

    const productCategories = await ProductCategories.find({
      $text: { $search: query.toLowerCase().trim() },
    }).toArray();
    return productCategories;
  }
}
