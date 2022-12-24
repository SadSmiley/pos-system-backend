import utils from 'utils';
import { ObjectId } from 'mongodb';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class Service {
  cachedData: { [key: string]: any };

  collection: any;

  type: any;

  constructor(collection: any, type: any) {
    this.cachedData = {};
    this.collection = collection;
    this.type = type;
  }

  async findAll() {
    const products = await this.collection.find().toArray();
    return products;
  }

  async createOne(data: this['type']) {
    const insertResult = await this.collection.insertOne(data);
    if (!insertResult.acknowledged)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Error inserting product.',
        false,
      );
    return insertResult;
  }

  async findOne(id: string) {
    let result = await this.collection.findOne({
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

  async updateOne(id: string, data: this['type']) {
    const result = await this.collection.findOneAndUpdate(
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
    const result = await this.collection.findOneAndDelete({
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
}