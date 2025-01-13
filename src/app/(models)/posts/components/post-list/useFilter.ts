import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';

export const useFilter = (posts: Post[]) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tag = searchParams.get('tag');

    if (tag) {
      setFilteredPosts(
        posts.filter((post) => {
          return post.tags.map(({ id }) => id).includes(tag);
        }),
      );
    }
  }, [posts, searchParams]);

  return { posts: filteredPosts };
};
