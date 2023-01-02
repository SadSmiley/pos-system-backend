"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.findOne = exports.createOne = exports.findAll = void 0;
const productCategories_service_1 = __importDefault(require("./productCategories.service"));
const ProductCategoryServiceInstance = new productCategories_service_1.default();
async function findAll(req, res, next) {
    try {
        const productCategories = await ProductCategoryServiceInstance.findAll();
        res.json(productCategories);
    }
    catch (error) {
        next(error);
    }
}
exports.findAll = findAll;
async function createOne(req, res, next) {
    try {
        const insertResult = await ProductCategoryServiceInstance.createOne(req.body);
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    }
    catch (error) {
        next(error);
    }
}
exports.createOne = createOne;
async function findOne(req, res, next) {
    try {
        const result = await ProductCategoryServiceInstance.findOne(req.params.id);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
exports.findOne = findOne;
async function updateOne(req, res, next) {
    try {
        const result = await ProductCategoryServiceInstance.updateOne(req.params.id, req.body);
        res.json(result.value);
    }
    catch (error) {
        next(error);
    }
}
exports.updateOne = updateOne;
async function deleteOne(req, res, next) {
    try {
        await ProductCategoryServiceInstance.deleteOne(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=productCategories.controller.js.map