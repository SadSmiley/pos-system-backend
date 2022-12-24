import { InsertOneResult, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Transaction = z.object({
  order_id: z.string().min(1).trim(),
  product_id: z.string().min(1).trim(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export type Transaction = z.infer<typeof Transaction>;
export type TransactionWithId = WithId<Transaction>;
export type TransactionInsertOneResult = InsertOneResult<Transaction>;
export const Transactions = db.collection<Transaction>('transactions');
