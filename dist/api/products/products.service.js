"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = require("./products.model");
const mongodb_1 = require("mongodb");
const utils_1 = __importDefault(require("../../utils"));
const service_1 = require("../service");
const productCategories_service_1 = __importDefault(require("../productCategories/productCategories.service"));
// Extract classes and enums from utils
const { classes, enums } = utils_1.default;
const { AppError } = classes;
const { HttpErrorCode } = enums;
class ProductService extends service_1.CRUDService {
    constructor() {
        super(products_model_1.Products, products_model_1.Product, 'Product');
    }
    async createOne(data) {
        // validate categoryId if it exists in the database
        await this.validateProductCategory(data.categoryId);
        // check upc already exists then throw error
        await this.validateAlreadyExistUPC(data.upc);
        const result = await super.createOne(data);
        return result;
    }
    async updateOne(id, data) {
        // get product data
        const productData = await this.findOne(id);
        // validate categoryId if it exists in the database
        await this.validateProductCategory(data.categoryId);
        // check upc already exists then throw error only if upc is changed
        if (productData.upc !== data.upc)
            await this.validateAlreadyExistUPC(data.upc);
        const result = await super.updateOne(id, data);
        return result;
    }
    async validateAlreadyExistUPC(upc) {
        if (!upc) {
            return;
        }
        const upcExists = await products_model_1.Products
            .find({ upc: upc })
            .toArray();
        if (upcExists.length > 0) {
            throw new AppError(HttpErrorCode.BadRequest, `Product with upc "${upc}" already exists.`, false);
        }
    }
    async search(query) {
        // create index for text search
        await products_model_1.Products.createIndex({ name: 'text' });
        const products = await products_model_1.Products.find({
            $text: { $search: query.toLowerCase().trim() },
        }).toArray();
        return products;
    }
    // update product quantity
    async updateQuantity(id, quantity) {
        const result = await products_model_1.Products.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(id),
        }, {
            $inc: { countInStock: -quantity },
        }, {
            returnDocument: 'after',
        });
        if (!result.value) {
            throw new AppError(HttpErrorCode.NotFound, `Product with id "${id}" not found.`, false);
        }
        return result;
    }
    // validate product quantity
    async validateQuantity(id, quantity) {
        const product = this.cachedData[id] ||
            (await products_model_1.Products.findOne({
                _id: new mongodb_1.ObjectId(id),
            }));
        if (!product) {
            throw new AppError(HttpErrorCode.NotFound, `Product with id "${id}" not found.`, false);
        }
        if (product.countInStock < quantity) {
            throw new AppError(HttpErrorCode.BadRequest, `Product with id "${id}" is out of stock.`, false);
        }
    }
    // find product by upc
    async findByUPC(upc) {
        const product = await products_model_1.Products.findOne({
            upc,
        });
        if (!product) {
            throw new AppError(HttpErrorCode.NotFound, `Product with upc "${upc}" not found.`, false);
        }
        return product;
    }
    // validate category id
    async validateProductCategory(categoryId) {
        if (!categoryId)
            return;
        const productCategoryService = new productCategories_service_1.default();
        await productCategoryService.findOne(categoryId);
    }
}
exports.default = ProductService;
//# sourceMappingURL=products.service.js.map