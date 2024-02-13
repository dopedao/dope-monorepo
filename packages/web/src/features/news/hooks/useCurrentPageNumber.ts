import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useCurrentPageNumber = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (router.isReady) {
      const pageIndex =
        typeof router.query.page === 'string' && !Number.isNaN(parseInt(router.query.page))
          ? parseInt(router.query.page)
          : 1;

      setPage(pageIndex);
    }
  }, [router]);

  return page;
};

export default useCurrentPageNumber;
