"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParamsWithId_1 = require("../../interfaces/ParamsWithId");
const ParamsWithUPC_1 = require("../../interfaces/ParamsWithUPC");
const SearchParams_1 = require("../../interfaces/SearchParams");
const middlewares_1 = require("../../middlewares");
const ProductController = __importStar(require("./products.controller"));
const products_model_1 = require("./products.model");
const router = (0, express_1.Router)();
router.get('/', ProductController.findAll);
router.get('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
}), ProductController.findOne);
router.get('/upc/:upc', (0, middlewares_1.validateRequest)({
    params: ParamsWithUPC_1.ParamsWithUPC,
}), ProductController.findByUPC);
router.post('/', (0, middlewares_1.validateRequest)({
    body: products_model_1.Product,
}), ProductController.createOne);
router.put('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
    body: products_model_1.Product,
}), ProductController.updateOne);
router.delete('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
}), ProductController.deleteOne);
router.get('/search/:name', (0, middlewares_1.validateRequest)({
    params: SearchParams_1.SearchParams,
}), ProductController.search);
exports.default = router;
//# sourceMappingURL=products.routes.js.map