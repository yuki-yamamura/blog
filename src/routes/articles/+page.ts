import type { Article } from '../../lib/types/article';

export function load(): { articles: Article[] } {
	return {
		articles: [
			{
				slug: 'foo',
				title: 'Foo article'
			},
			{
				slug: 'bar',
				title: 'Bar article'
			},
			{
				slug: 'hoge',
				title: 'Hoge article'
			}
		]
	};
}
