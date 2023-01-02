"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const productCategories_model_1 = require("./productCategories.model");
beforeAll(async () => {
    try {
        await productCategories_model_1.ProductCategories.drop();
    }
    catch (error) { }
});
describe('GET /api/v1/productCategories', () => {
    it('responds with an array of productCategories', async () => (0, supertest_1.default)(app_1.default)
        .get('/api/v1/productCategories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
    }));
});
let id = '';
describe('POST /api/v1/productCategories', () => {
    it('responds with an error if the productCategory is invalid', async () => (0, supertest_1.default)(app_1.default)
        .post('/api/v1/productCategories')
        .set('Accept', 'application/json')
        .send()
        .expect('Content-Type', /json/)
        .expect(422)
        .then((response) => {
        expect(response.body).toHaveProperty('message');
    }));
    it('responds with an inserted object', async () => (0, supertest_1.default)(app_1.default)
        .post('/api/v1/productCategories')
        .set('Accept', 'application/json')
        .send({
        name: 'Sample Product Category',
        description: 'Sample Product Category Description',
        image: 'https://example.com/sample-product-category.jpg',
    })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
    }));
});
describe('GET /api/v1/productCategories/:id', () => {
    it('responds with a single productCategory', async () => (0, supertest_1.default)(app_1.default)
        .get(`/api/v1/productCategories/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
    }));
    it('responds with an invalid ObjectId error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/api/v1/productCategories/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/api/v1/productCategories/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
describe('PUT /api/v1/productCategories/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .put('/api/v1/productCategories/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .put('/api/v1/productCategories/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .send({
            name: 'Sample Product Category',
            description: 'Sample Product Category Description',
            image: 'https://example.com/sample-product-category.jpg',
        })
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a single productCategory', async () => (0, supertest_1.default)(app_1.default)
        .put(`/api/v1/productCategories/${id}`)
        .set('Accept', 'application/json')
        .send({
        name: 'Sample Product Category 2',
        description: 'Sample Product Category Description 2',
        image: 'https://example.com/sample-product-category.jpg',
    })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
    }));
});
describe('DELETE /api/v1/productCategories/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/productCategories/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/productCategories/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a 204 status code', (done) => {
        (0, supertest_1.default)(app_1.default).delete(`/api/v1/productCategories/${id}`).expect(204, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/productCategories/${id}`)
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});
//# sourceMappingURL=productCategories.test.js.map