export const getPath = {
  '/': () => '/',
  '/about': () => '/about',
  '/posts': () => '/posts',
  '/posts:id': (id: string) => `/posts/${id}`,
  '/posts/page:number': (pageNumber: number) => `/posts/page/${pageNumber}`,
} as const satisfies Record<string, (...args: never) => string>;
