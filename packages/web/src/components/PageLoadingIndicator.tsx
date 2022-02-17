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
  font-size: var(--text-04);
  line-height: 14px;
  padding: 8px 0px;
  white-space: no-wrap;
`;

const PageLoadingIndicator = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    // Prevent flash of un-styled content by showing static until font loaded.
    // Use (document as any) to prevent server build errors.
    (document as any).fonts.load('12px ChicagoFLF').then(() => {
      setIsFontLoaded(true);
    });

    const handleStart = (url: string) => {
      document.body.classList.add('wait');
      setIsLoading(true);
    };
    const handleComplete = (url: string) => {
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
  }, [isLoading, router.events]);

  return (
    <>
      {(!isFontLoaded || isLoading) && (
        <LoadingWrapper>
          <LoadingMessage>L O A D I N G</LoadingMessage>
        </LoadingWrapper>
      )}
    </>
  );
};

export default PageLoadingIndicator;
