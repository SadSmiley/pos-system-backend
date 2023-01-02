"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = __importDefault(require("../products/products.service"));
const orders_service_1 = __importDefault(require("../orders/orders.service"));
const transactions_service_1 = __importDefault(require("../transactions/transactions.service"));
class CartService {
    async checkout(products) {
        // product service instance
        const ProductServiceInstance = new products_service_1.default();
        // order service instance
        const OrderServiceInstance = new orders_service_1.default();
        // transaction service instance
        const TransactionServiceInstance = new transactions_service_1.default();
        // validate products quantity
        const productsWithData = await Promise.all(products.map(async (product) => {
            const productData = await ProductServiceInstance.findOne(product.product_id);
            await ProductServiceInstance.validateQuantity(product.product_id, product.quantity);
            return Object.assign({}, product, productData);
        }));
        // generate order number start with 1 check database for last order number and increment
        const orderNumber = await OrderServiceInstance.generateOrderNumber();
        // insert order
        const insertedOrder = await OrderServiceInstance.createOne({
            number: orderNumber,
            date_created: new Date(),
        });
        let transactions = await Promise.all(productsWithData.map(async (product) => {
            // insert transaction
            const transaction = await TransactionServiceInstance.createOne({
                order_id: insertedOrder.insertedId.toString(),
                product_id: product.product_id,
                quantity: product.quantity,
                price: product.price,
            });
            // update product quantity
            await ProductServiceInstance.updateQuantity(product.product_id, product.quantity);
            return transaction;
        }));
        return { transactions, order: insertedOrder };
    }
}
exports.default = CartService;
//# sourceMappingURL=carts.service.js.map