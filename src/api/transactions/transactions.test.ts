import request from 'supertest';

import app from '../../app';
import { Transactions } from './transactions.model';

beforeAll(async () => {
  try {
    await Transactions.drop();
  } catch (error) {}
});

describe('POST /api/v1/transactions/checkout', () => {
  it('expect product out of stock', async () => {
    const productId = await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send({
        name: 'Sample Product',
        price: 1.99,
        image: 'https://example.com/sample-product.jpg',
        countInStock: 0,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body).toHaveProperty('_id');
        return res.body._id;
      });

    await request(app)
      .post('/api/v1/transactions/checkout')
      .set('Accept', 'application/json')
      .send({
        products: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  it('expect product not found', async () => {
    await request(app)
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
  it('expect success', async () => {
    const productId = await request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send({
        name: 'Sample Product',
        price: 1.99,
        image: 'https://example.com/sample-product.jpg',
        countInStock: 1,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body).toHaveProperty('_id');
        return res.body._id;
      });

    await request(app)
      .post('/api/v1/transactions/checkout')
      .set('Accept', 'application/json')
      .send({
        products: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body).toHaveProperty('transactions');
        expect(res.body).toHaveProperty('order');
        expect(res.body.transactions).toHaveLength(1);
        expect(res.body.order).toHaveProperty('insertedId');
      });
  });
});
