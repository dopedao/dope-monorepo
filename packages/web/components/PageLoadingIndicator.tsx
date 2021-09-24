// Displays Loading indicator when routing between Next.js pages
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const LoadingWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999;
  background-image: url('/images/static.gif');
  opacity: 0.66;
  display: flex;
  align-items: center;
`;

const LoadingMessage = styled.div`
  background-color: #000000;
  color: #fffc3f;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-size: 3.5em;
  line-height: 14px;
  padding: 8px 0px;
  white-space: no-wrap;
`;

const PageLoadingIndicator = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Starting URL transition ${url}`);
      document.body.classList.add('wait');
      setIsLoading(true);
    };
    const handleComplete = (url: string) => {
      console.log(`Completed ${url}`);
      document.body.classList.remove('wait');
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // cleanup
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <LoadingMessage>L O A D I N G</LoadingMessage>
        </LoadingWrapper>
      )}
    </>
  );
};

export default PageLoadingIndicator;
