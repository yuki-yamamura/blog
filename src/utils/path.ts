export const pathMap = {
  '/': {
    get: () => '/',
  },
  '/about': {
    get: () => '/about',
  },
  '/posts': {
    get: () => '/posts',
  },
  '/posts:id': {
    get: (id: string) => `/posts/${id}`,
  },
  '/posts/page:number': {
    get: (pageNumber: number) => `/posts/page/${pageNumber}`,
  },
} as const satisfies Record<string, { get: (...args: never) => string }>;
