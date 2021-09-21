import styled from '@emotion/styled';
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const LoadingWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 50%;
  margin: 0px;
  z-index: 999;
`;

const LoadingMessage = styled.div`
  background-color: #000000;
  color: #FFFC3F;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-size: 16px;
  line-height: 14px;
  padding: 8px 0px;
  @keyframes type-zoom{
    0% {
      font-size: 8px;
    }
    25% {
      font-size: 16px;
    }
    50% {
      font-size: 32px;
    }
    75% {
      font-size: 64px;
    }
    100% {
      font-size: 72px;
    }
  }
  animation: type-zoom infinite .25s alternate;
`;

const LoadingIndicator = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Starting URL transition ${url}`);
      document.body.classList.add('wait');
      setIsLoading(true);
    }
    const handleComplete = (url: string) => {
      console.log(`Completed ${url}`);
      document.body.classList.remove('wait');
      setIsLoading(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    // cleanup
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <LoadingMessage>
            L O A D I N G
          </LoadingMessage>
        </LoadingWrapper>
      )}
    </>
  )
}

export default LoadingIndicator;