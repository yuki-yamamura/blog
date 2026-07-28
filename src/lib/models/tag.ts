import { z } from 'zod';

import { err, ok } from '../utils/result';

import type { Brand } from '../types/brand';
import type { Result } from '../utils/result';

export const tagSchema = z.enum(['cloudflare', 'diary', 'html', 'typescript', 'vitest']);

export type Tag = z.infer<typeof tagSchema>;

const TagsSchema = z
  .array(tagSchema)
  .min(1, { message: 'At least one tag is required' })
  .refine((tags) => new Set(tags).size === tags.length, {
    message: 'Tags must be unique',
  });

declare const _sortedTagsSymbol: unique symbol;
export type SortedTags = Brand<typeof _sortedTagsSymbol> & Tag[];

/**
 * A constructor function to create a sorted list of tags in ascending order.
 */
export function createSortedTags(tags: Tag[]): Result<SortedTags, Error> {
  const tagsResult = TagsSchema.safeParse(tags);
  if (!tagsResult.success) {
    return err(new Error(`Invalid tags: ${tagsResult.error.message}`));
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We allow to use type assertion inside a constructor function when using a branded type.
  return ok(tagsResult.data.toSorted((a, b) => a.localeCompare(b)) as SortedTags);
}
