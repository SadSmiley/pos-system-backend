import request from 'supertest';

import app from '../../app';
import { Orders } from './orders.model';

beforeAll(async () => {
  try {
    await Orders.drop();
  } catch (error) {}
});

describe('GET /api/v1/orders/number', () => {
  it('responds with last order number', async () => {
    await request(app)
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
