import { InsertOneResult, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Order = z.object({
  number: z.number().min(1),
  date_created: z.date(),
});

export type Order = z.infer<typeof Order>;
export type OrderWithId = WithId<Order>;
export type OrderInsertOneResult = InsertOneResult<Order>;
export const Orders = db.collection<Order>('orders');
