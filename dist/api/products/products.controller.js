"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUPC = exports.search = exports.deleteOne = exports.updateOne = exports.findOne = exports.createOne = exports.findAll = void 0;
const products_service_1 = __importDefault(require("./products.service"));
const ProductServiceInstance = new products_service_1.default();
async function findAll(req, res, next) {
    try {
        const products = await ProductServiceInstance.findAll();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}
exports.findAll = findAll;
async function createOne(req, res, next) {
    try {
        const insertResult = await ProductServiceInstance.createOne(req.body);
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
        const result = await ProductServiceInstance.findOne(req.params.id);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
exports.findOne = findOne;
async function updateOne(req, res, next) {
    try {
        const result = await ProductServiceInstance.updateOne(req.params.id, req.body);
        res.json(result.value);
    }
    catch (error) {
        next(error);
    }
}
exports.updateOne = updateOne;
async function deleteOne(req, res, next) {
    try {
        await ProductServiceInstance.deleteOne(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}
exports.deleteOne = deleteOne;
async function search(req, res, next) {
    try {
        const products = await ProductServiceInstance.search(req.params.name);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}
exports.search = search;
async function findByUPC(req, res, next) {
    try {
        const products = await ProductServiceInstance.findByUPC(req.params.upc);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}
exports.findByUPC = findByUPC;
//# sourceMappingURL=products.controller.js.map