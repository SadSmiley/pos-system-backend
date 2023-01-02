"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const carts_service_1 = __importDefault(require("../carts/carts.service"));
const CartServiceInstance = new carts_service_1.default();
async function checkout(req, res, next) {
    try {
        const transaction = await CartServiceInstance.checkout(req.body.products);
        res.status(201);
        res.send(transaction);
    }
    catch (error) {
        next(error);
    }
}
exports.checkout = checkout;
//# sourceMappingURL=transactions.controller.js.map