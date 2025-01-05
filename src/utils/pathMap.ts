export const pathMap = {
  '/': {
    get: () => '/',
  },
  '/about/': {
    get: () => '/about/',
  },
  '/posts/': {
    get: () => '/posts/',
  },
  '/posts/:id/': {
    get: (id: string) => `/posts/${id}/`,
  },
  '/posts/page/:page/': {
    get: (page: number) => `/posts/page/${page}/`,
  },
} as const satisfies Record<string, { get: (...args: never) => string }>;
