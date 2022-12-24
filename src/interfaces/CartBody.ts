import * as z from 'zod';
import { ObjectId } from 'mongodb';

export const CartBody = z.object({
  products: z
    .array(z.object({
      product_id: z.string().min(1).trim().refine((val) => {
        try {
          return new ObjectId(val);
        } catch (error) {
          return false;
        }
      }, {
        message: 'Invalid ObjectId',
      }),
      quantity: z.number().min(1),
    }))
    .min(1),
});

export type CartBody = z.infer<typeof CartBody>;
