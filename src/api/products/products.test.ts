import request from 'supertest';

import app from '../../app';
import { Products } from './products.model';

beforeAll(async () => {
  try {
    await Products.drop();
  } catch (error) {}
});

const sampleProduct: { [key: string]: string | number } = {
  name: 'Sample Product',
  price: 1.99,
  image: 'https://example.com/sample-product.jpg',
};

describe('GET /api/v1/products', () => {
  it('responds with an array of products', async () =>
    request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/products', () => {
  it('responds with an error if the product is invalid', async () =>
    request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send(sampleProduct)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;

        // cross check using sampleProduct variable using loop
        for (const key in sampleProduct) {
          let value = sampleProduct[key];
          expect(response.body).toHaveProperty(key);
          expect(response.body[key]).toBe(value);
        }
      }));
});

describe('GET /api/v1/products/:id', () => {
  it('responds with a single product', async () =>
    request(app)
      .get(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);

        // cross check using sampleProduct variable using loop
        for (const key in sampleProduct) {
          let value = sampleProduct[key];
          expect(response.body).toHaveProperty(key);
          expect(response.body[key]).toBe(value);
        }
      }));
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/products/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/products/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/products/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send(sampleProduct)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single product', async () =>
    request(app)
      .put(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .send(sampleProduct)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);

        // cross check using sampleProduct variable using loop
        for (const key in sampleProduct) {
          let value = sampleProduct[key];
          expect(response.body).toHaveProperty(key);
          expect(response.body[key]).toBe(value);
        }
      }));
});

describe('DELETE /api/v1/products/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/products/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app).delete(`/api/v1/products/${id}`).expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('POST /api/v1/products/search/:name', () => {
  it('responds with an empty array', async () => {
    await request(app)
      .get('/api/v1/products/search/INVALID_PRODUCT_NAME')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(0);
      });
  });
  const appleProduct = Object.assign({}, sampleProduct, { name: 'Apple' });
  it('responds with an array of products', async () => {
    await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send(appleProduct)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');

        // cross check using sampleProduct variable using loop
        for (const key in appleProduct) {
          let value = appleProduct[key];
          expect(response.body).toHaveProperty(key);
          expect(response.body[key]).toBe(value);
        }
      });

    await request(app)
      .get(`/api/v1/products/search/${ appleProduct.name }`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
      });
  });
});
