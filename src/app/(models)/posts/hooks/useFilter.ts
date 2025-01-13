import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';

export const useFilter = (initialPosts: Post[]) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tag = searchParams.get('tag');

    if (tag) {
      setFilteredPosts(
        initialPosts.filter((post) => {
          return post.tags.map(({ id }) => id).includes(tag);
        }),
      );
    }
  }, [initialPosts, searchParams]);

  return { posts: filteredPosts };
};
