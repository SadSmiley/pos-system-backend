"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const transactions_model_1 = require("./transactions.model");
beforeAll(async () => {
    try {
        await transactions_model_1.Transactions.drop();
    }
    catch (error) { }
});
describe('POST /api/v1/transactions/checkout', () => {
    // it('expect product out of stock', async () => {
    //   const productId = await request(app)
    //     .post('/api/v1/products')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Sample Product',
    //       price: 1.99,
    //       image: 'https://example.com/sample-product.jpg',
    //       countInStock: 0,
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(201)
    //     .then(res => {
    //       expect(res.body).toHaveProperty('_id');
    //       return res.body._id;
    //     });
    //   await request(app)
    //     .post('/api/v1/transactions/checkout')
    //     .set('Accept', 'application/json')
    //     .send({
    //       products: [
    //         {
    //           product_id: productId,
    //           quantity: 1,
    //         },
    //       ],
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(400);
    // });
    it('expect product not found', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/transactions/checkout')
            .set('Accept', 'application/json')
            .send({
            products: [
                {
                    product_id: '5e9f1b9b9c9d4b0b8c8c8c8c',
                    quantity: 1,
                },
            ],
        })
            .expect('Content-Type', /json/)
            .expect(404)
            .then(res => {
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('Product with id "5e9f1b9b9c9d4b0b8c8c8c8c" not found.');
        });
    });
    // it('expect success', async () => {
    //   const productId = await request(app)
    //     .post('/api/v1/products')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Sample Product',
    //       price: 1.99,
    //       image: 'https://example.com/sample-product.jpg',
    //       countInStock: 1,
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(201)
    //     .then(res => {
    //       expect(res.body).toHaveProperty('_id');
    //       return res.body._id;
    //     });
    //   await request(app)
    //     .post('/api/v1/transactions/checkout')
    //     .set('Accept', 'application/json')
    //     .send({
    //       products: [
    //         {
    //           product_id: productId,
    //           quantity: 1,
    //         },
    //       ],
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(201)
    //     .then(res => {
    //       expect(res.body).toHaveProperty('transactions');
    //       expect(res.body).toHaveProperty('order');
    //       expect(res.body.transactions).toHaveLength(1);
    //       expect(res.body.order).toHaveProperty('insertedId');
    //     });
    // });
});
//# sourceMappingURL=transactions.test.js.map