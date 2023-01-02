"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = require("./orders.model");
const utils_1 = __importDefault(require("../../utils"));
const service_1 = require("../service");
// Extract classes and enums from utils
const { classes, enums } = utils_1.default;
const { AppError } = classes;
const { HttpErrorCode } = enums;
class OrderService extends service_1.CRUDService {
    constructor() {
        super(orders_model_1.Orders, orders_model_1.Order, 'Order');
    }
    // generate order number start with 1 check database for last order number and increment
    async generateOrderNumber() {
        const lastOrder = await orders_model_1.Orders.find().sort({ number: -1 }).limit(1).toArray();
        return lastOrder.length ? lastOrder[0].number + 1 : 1;
    }
    // create one
    async createOne(data) {
        // before inserting validate if order number already exists
        const orderNumberExists = await orders_model_1.Orders.findOne({ number: data.number });
        if (orderNumberExists)
            throw new AppError(HttpErrorCode.BadRequest, 'Order number already exists.', false);
        // insert order
        const insertResult = await orders_model_1.Orders.insertOne(data);
        if (!insertResult.acknowledged)
            throw new AppError(HttpErrorCode.BadRequest, 'Error inserting order.', false);
        return insertResult;
    }
}
exports.default = OrderService;
//# sourceMappingURL=orders.service.js.map