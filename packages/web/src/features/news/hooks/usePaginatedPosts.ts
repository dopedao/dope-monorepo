import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PostType } from 'features/news/types';

const MAX_POST_PER_PAGE = 9;

const usePaginatedPosts = (posts: PostType[]) => {
  const router = useRouter();
  const [paginatedPosts, setPaginatedPosts] = useState<PostType[]>(
    posts.slice(0, MAX_POST_PER_PAGE),
  );
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const pageIndex =
        typeof router.query.page === 'string' && !Number.isNaN(parseInt(router.query.page))
          ? parseInt(router.query.page) - 1
          : 0;

      const skip = pageIndex * MAX_POST_PER_PAGE;
      setPaginatedPosts(posts.slice(0 + skip, MAX_POST_PER_PAGE + skip));
      setHasMore(MAX_POST_PER_PAGE + skip < posts.length);
    }
  }, [posts, router]);

  return { paginatedPosts, hasMore };
};

export default usePaginatedPosts;
