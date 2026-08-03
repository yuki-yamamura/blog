import { describe, expect, it } from 'vitest';

import { selectRelatedArticleSlugs } from './article';

import type { ArticleMetadata } from './article';

function meta(slug: string, publishDate: string): ArticleMetadata {
  return { publishDate, slug };
}

describe('selectRelatedArticleSlugs', () => {
  const sorted = [
    meta('a', '2026-08-06T00:00:00Z'),
    meta('b', '2026-08-05T00:00:00Z'),
    meta('c', '2026-08-04T00:00:00Z'),
    meta('d', '2026-08-03T00:00:00Z'),
    meta('e', '2026-08-02T00:00:00Z'),
    meta('f', '2026-08-01T00:00:00Z'),
  ];

  it('returns the 5 latest articles when current is the newest', () => {
    const result = selectRelatedArticleSlugs(sorted, 'a');
    expect(result.isOk).toBe(true);
    if (result.isOk) expect(result.value).toEqual(['b', 'c', 'd', 'e', 'f']);
  });

  it('returns the 5 newest older articles when current is the oldest', () => {
    const result = selectRelatedArticleSlugs(sorted, 'f');
    expect(result.isOk).toBe(true);
    if (result.isOk) expect(result.value).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('prefers newer articles then falls back to older when current is in the middle', () => {
    const result = selectRelatedArticleSlugs(sorted, 'c');
    expect(result.isOk).toBe(true);
    if (result.isOk) expect(result.value).toEqual(['a', 'b', 'd', 'e', 'f']);
  });

  it('matches the specification example', () => {
    const example = [
      meta('20260803', '2026-08-03T00:00:00Z'),
      meta('20260802', '2026-08-02T00:00:00Z'),
      meta('20260801', '2026-08-01T00:00:00Z'),
      meta('20260731', '2026-07-31T00:00:00Z'),
      meta('20260730', '2026-07-30T00:00:00Z'),
      meta('20260729', '2026-07-29T00:00:00Z'),
    ];
    const result = selectRelatedArticleSlugs(example, '20260802');
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value).toEqual(['20260803', '20260801', '20260731', '20260730', '20260729']);
    }
  });

  it('returns Err when the current slug is not found', () => {
    const result = selectRelatedArticleSlugs(sorted, 'zzz');
    expect(result.isErr).toBe(true);
  });

  it('returns Err when there are not enough articles', () => {
    const short = [meta('a', '2026-08-06T00:00:00Z'), meta('b', '2026-08-05T00:00:00Z')];
    const result = selectRelatedArticleSlugs(short, 'a');
    expect(result.isErr).toBe(true);
  });
});
