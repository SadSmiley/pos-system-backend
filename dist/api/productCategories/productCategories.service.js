"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productCategories_model_1 = require("./productCategories.model");
const service_1 = require("../service");
class ProductCategoryService extends service_1.CRUDService {
    constructor() {
        super(productCategories_model_1.ProductCategories, productCategories_model_1.ProductCategory, 'Product Category');
    }
}
exports.default = ProductCategoryService;
//# sourceMappingURL=productCategories.service.js.map