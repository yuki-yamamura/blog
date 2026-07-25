export const pathMap = {
	'/': {
		get: () => '/'
	},
	'/about': {
		get: () => '/about'
	},
	'/articles': {
		get: () => '/articles'
	},
	'/articles/:slug': {
		get: (slug: string) => `/articles/${slug}`
	}
} as const satisfies Record<string, { get: (...args: string[]) => string }>;
