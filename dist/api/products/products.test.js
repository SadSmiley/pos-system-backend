"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const products_model_1 = require("./products.model");
beforeAll(async () => {
    try {
        await products_model_1.Products.drop();
    }
    catch (error) { }
});
// generate random 12 digits number
const randomUpc = () => String(Math.floor(Math.random() * 1000000000000));
const sampleProduct = {
    name: 'Sample Product',
    price: 1.99,
    image: 'https://example.com/sample-product.jpg',
    categoryId: '5f9f1b9b9c9d9c0b8c8b8b8b',
    upc: randomUpc(),
};
const validateSampleProduct = (response, product = sampleProduct) => {
    for (const key in product) {
        let value = product[key];
        expect(response.body).toHaveProperty(key);
        expect(response.body[key]).toBe(value);
    }
};
let productId = '';
let productWithCategoryData = {};
describe('GET /api/v1/products', () => {
    it('responds with an array of products', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body).toHaveProperty('length');
            expect(response.body.length).toBe(0);
        });
    });
});
describe('POST /api/v1/products', () => {
    it('responds with an error if the product is invalid', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body).toHaveProperty('message');
        });
    });
    it('responds with not found error because category does not exists', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Accept', 'application/json')
            .send(sampleProduct)
            .expect('Content-Type', /json/);
    });
    it('expect success', async () => {
        const categoryId = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/productCategories')
            .set('Accept', 'application/json')
            .send({
            name: 'Sample Category',
        })
            .expect('Content-Type', /json/)
            .then((res) => {
            expect(res.body).toHaveProperty('_id');
            return res.body._id;
        });
        const productWithCategory = Object.assign({}, sampleProduct, {
            categoryId,
            upc: randomUpc(),
        });
        await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Accept', 'application/json')
            .send(productWithCategory)
            .expect('Content-Type', /json/)
            .then((res) => {
            expect(res.body).toHaveProperty('_id');
            productId = res.body._id;
            validateSampleProduct(res, productWithCategory);
            productWithCategoryData = productWithCategory;
        });
    });
});
describe('GET /api/v1/products/:id', () => {
    it('responds with a single product', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/products/${productId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(productId);
            validateSampleProduct(response, productWithCategoryData);
        });
    });
    it('responds with an invalid ObjectId error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/products/INVALID_PRODUCT_ID')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
    it('responds with a not found error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/products/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
});
describe('PUT /api/v1/products/:id', () => {
    it('responds with an invalid ObjectId error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .put('/api/v1/products/INVALID_PRODUCT_ID')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
    it('responds with a not found error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .put('/api/v1/products/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .send(sampleProduct)
            .expect('Content-Type', /json/);
    });
    it('responds with a single product', async () => {
        const categoryId = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/productCategories')
            .set('Accept', 'application/json')
            .send({
            name: 'Sample Category',
        })
            .expect('Content-Type', /json/)
            .then((res) => {
            expect(res.body).toHaveProperty('_id');
            return res.body._id;
        });
        const productWithCategory = Object.assign({}, sampleProduct, {
            categoryId,
            upc: randomUpc(),
        });
        await (0, supertest_1.default)(app_1.default)
            .put(`/api/v1/products/${productId}`)
            .set('Accept', 'application/json')
            .send(productWithCategory)
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(productId);
            validateSampleProduct(response, productWithCategory);
        });
    });
});
describe('DELETE /api/v1/products/:id', () => {
    it('responds with an invalid ObjectId error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/products/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
    it('responds with a not found error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/products/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
    it('responds with a 204 status code', async () => {
        await (0, supertest_1.default)(app_1.default).delete(`/api/v1/products/${productId}`).expect(204);
    });
    it('responds with a not found error', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/products/${productId}`)
            .set('Accept', 'application/json');
    });
});
describe('POST /api/v1/products/search/:name', () => {
    it('responds with an empty array', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/products/search/INVALID_PRODUCT_NAME')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body.length).toBe(0);
        });
    });
    it('responds with an array of products', async () => {
        const categoryId = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/productCategories')
            .set('Accept', 'application/json')
            .send({
            name: 'Sample Category',
        })
            .expect('Content-Type', /json/)
            .then((res) => {
            expect(res.body).toHaveProperty('_id');
            return res.body._id;
        });
        const appleProduct = Object.assign({}, sampleProduct, {
            name: 'Apple',
            categoryId,
        });
        await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/products')
            .set('Accept', 'application/json')
            .send(appleProduct)
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body).toHaveProperty('_id');
            validateSampleProduct(response, appleProduct);
        });
        await (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/products/search/${appleProduct.name}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
            expect(response.body.length).toBe(1);
        });
    });
});
//# sourceMappingURL=products.test.js.map