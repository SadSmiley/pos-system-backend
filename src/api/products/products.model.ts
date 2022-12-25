import { ObjectId, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Product = z.object({
  name: z.string().min(1).trim(),
  price: z.number().min(0),
  image: z.string().trim().optional(),
  upc: z.string().optional(),
  countInStock: z.number().min(0).default(0),
  categoryId: z.string().min(1).trim().optional().refine((val) => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return false;
    }
  }, {
    message: 'Invalid ObjectId',
  }),
});

export type Product = z.infer<typeof Product>;
export type ProductWithId = WithId<Product>;
export const Products = db.collection<Product>('products');
