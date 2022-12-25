import * as z from 'zod';

export const ParamsWithUPC = z.object({
  upc: z.string().min(1),
});

export type ParamsWithUPC = z.infer<typeof ParamsWithUPC>;
