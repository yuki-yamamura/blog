import { z } from 'zod';

import type { Brand } from '../types/brand';

export const tagSchema = z.enum(['cloudflare', 'diary', 'html', 'typescript', 'vitest']);

export type Tag = z.infer<typeof tagSchema>;

export const uniqueTagsSchema = z
  .array(tagSchema)
  .refine((tags) => new Set(tags).size === tags.length, {
    message: 'Tags must be unique',
  });

declare const _sortedTagsSymbol: unique symbol;

export type SortedTags = Brand<typeof _sortedTagsSymbol> & Tag[];

/**
 * Creates a sorted list of tags in ascending order.
 */
export function createSortedTags(tags: string[]): SortedTags {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We allow to use type assertion inside a constructor function when using a branded type.
  return uniqueTagsSchema
    .parse(tags.map((tag) => tagSchema.parse(tag)))
    .toSorted((a, b) => a.localeCompare(b)) as SortedTags;
}
