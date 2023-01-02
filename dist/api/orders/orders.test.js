"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const orders_model_1 = require("./orders.model");
beforeAll(async () => {
    try {
        await orders_model_1.Orders.drop();
    }
    catch (error) { }
});
describe('GET /api/v1/orders/number', () => {
    it('responds with last order number', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/orders/number')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            expect(response.body).toHaveProperty('number');
            expect(response.body.number).toEqual(1);
        });
    });
});
//# sourceMappingURL=orders.test.js.map