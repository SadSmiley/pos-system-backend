import * as z from 'zod';

export const SearchParams = z.object({
  name: z.string().min(1).trim(),
});

export type SearchParams = z.infer<typeof SearchParams>;
