import request from 'supertest';

import app from '../../app';
import { ProductCategories } from './productCategories.model';

beforeAll(async () => {
  try {
    await ProductCategories.drop();
  } catch (error) {}
});

describe('GET /api/v1/productCategories', () => {
  it('responds with an array of productCategories', async () =>
    request(app)
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
  it('responds with an error if the productCategory is invalid', async () =>
    request(app)
      .post('/api/v1/productCategories')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));
  it('responds with an inserted object', async () =>
    request(app)
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
  it('responds with a single productCategory', async () =>
    request(app)
      .get(`/api/v1/productCategories/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
      }));
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/productCategories/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/productCategories/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/productCategories/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/productCategories/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
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
  it('responds with a single productCategory', async () =>
    request(app)
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
    request(app)
      .delete('/api/v1/productCategories/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/productCategories/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app).delete(`/api/v1/productCategories/${id}`).expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/productCategories/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('POST /api/v1/productCategories/search/:name', () => {
  it('responds with an empty array', async () => {
    await request(app)
      .get('/api/v1/productCategories/search/INVALID_PRODUCTCATEGORY_NAME')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(0);
      });
  });

  it('responds with an array of productCategories', async () => {
    await request(app)
      .post('/api/v1/productCategories')
      .set('Accept', 'application/json')
      .send({
        name: 'Test Product Category',
        description: 'Apple Product Category Description',
        image: 'https://example.com/apple-product-category.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
      });

    await request(app)
      .get('/api/v1/productCategories/search/Test Product Category')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
      });
  });
});
