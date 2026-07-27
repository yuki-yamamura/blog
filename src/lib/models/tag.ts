import { z } from 'zod';

export const tagSchema = z.enum(['diary', 'typescript', 'vitest']);

export type Tag = z.infer<typeof tagSchema>;

export const uniqueTagsSchema = z
  .array(tagSchema)
  .refine((tags) => new Set(tags).size === tags.length, {
    message: 'Tags must be unique',
  });
