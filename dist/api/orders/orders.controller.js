"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersNumber = void 0;
const orders_service_1 = __importDefault(require("./orders.service"));
async function getOrdersNumber(req, res, next) {
    try {
        const orderService = new orders_service_1.default();
        const lastOrderNumber = await orderService.generateOrderNumber();
        res.status(200);
        res.send({ number: lastOrderNumber });
    }
    catch (error) {
        next(error);
    }
}
exports.getOrdersNumber = getOrdersNumber;
//# sourceMappingURL=orders.controller.js.map