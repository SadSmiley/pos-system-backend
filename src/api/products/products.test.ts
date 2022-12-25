import request from 'supertest';

import app from '../../app';
import { Products } from './products.model';

beforeAll(async () => {
  try {
    await Products.drop();
  } catch (error) {}
});

// generate random 12 digits number
const randomUpc = () => String(Math.floor(Math.random() * 1000000000000));

const sampleProduct: { [key: string]: string | number } = {
  name: 'Sample Product',
  price: 1.99,
  image: 'https://example.com/sample-product.jpg',
  categoryId: '5f9f1b9b9c9d9c0b8c8b8b8b',
  upc: randomUpc(),
};

const validateSampleProduct = (
  response: { body: { [x: string]: string | number } },
  product = sampleProduct,
) => {
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
    await request(app)
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
    await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  it('responds with not found error because category does not exists', async () => {
    await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send(sampleProduct)
      .expect('Content-Type', /json/);
  });
  it('expect success', async () => {
    const categoryId = await request(app)
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

    await request(app)
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
    await request(app)
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
    await request(app)
      .get('/api/v1/products/INVALID_PRODUCT_ID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  });
  it('responds with a not found error', async () => {
    await request(app)
      .get('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  });
});

describe('PUT /api/v1/products/:id', () => {
  it('responds with an invalid ObjectId error', async () => {
    await request(app)
      .put('/api/v1/products/INVALID_PRODUCT_ID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  });
  it('responds with a not found error', async () => {
    await request(app)
      .put('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send(sampleProduct)
      .expect('Content-Type', /json/);
  });
  it('responds with a single product', async () => {
    const categoryId = await request(app)
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

    await request(app)
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
    await request(app)
      .delete('/api/v1/products/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  });
  it('responds with a not found error', async () => {
    await request(app)
      .delete('/api/v1/products/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  });
  it('responds with a 204 status code', async () => {
    await request(app).delete(`/api/v1/products/${productId}`).expect(204);
  });
  it('responds with a not found error', async () => {
    await request(app)
      .get(`/api/v1/products/${productId}`)
      .set('Accept', 'application/json');
  });
});

describe('POST /api/v1/products/search/:name', () => {
  it('responds with an empty array', async () => {
    await request(app)
      .get('/api/v1/products/search/INVALID_PRODUCT_NAME')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.length).toBe(0);
      });
  });
  it('responds with an array of products', async () => {
    const categoryId = await request(app)
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

    await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send(appleProduct)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        validateSampleProduct(response, appleProduct);
      });

    await request(app)
      .get(`/api/v1/products/search/${appleProduct.name}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.length).toBe(1);
      });
  });
});
