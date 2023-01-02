"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./products/products.routes"));
const transactions_routes_1 = __importDefault(require("./transactions/transactions.routes"));
const productCategories_routes_1 = __importDefault(require("./productCategories/productCategories.routes"));
const orders_routes_1 = __importDefault(require("./orders/orders.routes"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});
router.use('/products', products_routes_1.default);
router.use('/transactions', transactions_routes_1.default);
router.use('/productCategories', productCategories_routes_1.default);
router.use('/orders', orders_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map