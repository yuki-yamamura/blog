import { pathMap } from '.';
import { describe, test, expect } from 'vitest';

describe('pathMap', () => {
  test('should return root path', () => {
    // act, assert
    expect(pathMap['/'].get()).toBe('/');
  });

  test('should return about path', () => {
    // act, assert
    expect(pathMap['/about/'].get()).toBe('/about/');
  });

  test('should return posts path', () => {
    // act, assert
    expect(pathMap['/posts/'].get()).toBe('/posts/');
  });

  test('should return specific post path', () => {
    // arrange
    const id = 'post-id';

    // act, assert
    expect(pathMap['/posts/:id/'].get(id)).toBe(`/posts/${id}/`);
  });

  test('should return paginated posts path', () => {
    // arrange
    const page = 2;

    // act, assert
    expect(pathMap['/posts/page/:page/'].get(page)).toBe(`/posts/page/${page}/`);
  });
});
