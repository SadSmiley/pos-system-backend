import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const ProductCategory = z.object({
  name: z.string().min(1).trim(),
  description: z.string().trim().default(''),
  image: z.string().trim().default(''),
});

export type ProductCategory = z.infer<typeof ProductCategory>;
export type ProductCategoryWithId = WithId<ProductCategory>;
export const ProductCategories = db.collection<ProductCategory>('productCategories');
