"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDService = void 0;
const utils_1 = __importDefault(require("../utils"));
const mongodb_1 = require("mongodb");
// Extract classes and enums from utils
const { classes, enums } = utils_1.default;
const { AppError } = classes;
const { HttpErrorCode } = enums;
class CRUDService {
    cachedData;
    collection;
    type;
    name;
    constructor(collection, type, name) {
        this.cachedData = {};
        this.collection = collection;
        this.type = type;
        this.name = name;
    }
    async findAll() {
        const data = await this.collection.find().toArray();
        return data;
    }
    async createOne(data) {
        const insertResult = await this.collection.insertOne(data);
        if (!insertResult.acknowledged)
            throw new AppError(HttpErrorCode.BadRequest, `Error inserting ${this.name}.`, false);
        return insertResult;
    }
    async findOne(id) {
        let result = await this.collection.findOne({
            _id: new mongodb_1.ObjectId(id),
        });
        if (!result) {
            throw new AppError(HttpErrorCode.NotFound, `${this.name} with id "${id}" not found.`, false);
        }
        this.cachedData[result._id.toString()] = result;
        return result;
    }
    async updateOne(id, data) {
        const result = await this.collection.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(id),
        }, {
            $set: data,
        }, {
            returnDocument: 'after',
        });
        if (!result.value) {
            throw new AppError(HttpErrorCode.NotFound, `${this.name} with id "${id}" not found.`, false);
        }
        return result;
    }
    async deleteOne(id) {
        const result = await this.collection.findOneAndDelete({
            _id: new mongodb_1.ObjectId(id),
        });
        if (!result.value) {
            throw new AppError(HttpErrorCode.NotFound, `${this.name} with id "${id}" not found.`, false);
        }
    }
}
exports.CRUDService = CRUDService;
//# sourceMappingURL=service.js.map