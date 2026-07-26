import z from 'zod';

export const createArticlesPageQueryParamsSchema = (totalPages: number) =>
  z.object({
    page: z.coerce.number().int().min(1).max(totalPages),
  });
