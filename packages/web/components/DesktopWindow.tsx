import { ReactNode, useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import Draggable from 'react-draggable';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import { media } from 'styles/mixins';
import { returnBreakpoint } from 'styles/breakpoints';
import { isTouchDevice } from 'src/utils';
import WindowPosition, { WindowPositionReactive } from 'src/WindowPosition';
import ConditionalWrapper from 'components/ConditionalWrapper';
import DesktopWindowTitleBar from 'components/DesktopWindowTitleBar';

type DesktopWindowProps = {
  title: string | undefined;
  width?: number | string;
  height?: number | string;
  titleChildren?: ReactNode;
  balance?: string;
  loadingBalance?: boolean;
  children: ReactNode;
  onResize?: () => void;
};

const WindowWrapper = styled.div<{ width: number | string; height: number | string }>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #a8a9ae;
  border: 2px solid #000;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  &.floating {
    ${media.phone`
        width: 100%;
        height: 100%;
        margin: 0;
      `}
    ${media.tablet`
        width: 100%;
        height: 100%;
        margin: 0;
      `}
      @media (min-width: ${returnBreakpoint('laptop')}) {
      width: 80%;
      height: 90%;
      margin: auto;
      margin-top: 32px;
      max-width: ${({ width }) => (typeof width == 'number' ? `${width}px` : width)};
      max-height: ${({ height }) => (typeof height == 'number' ? `${height}px` : height)};
    }
  }
`;

const DesktopWindow = ({
  title,
  // Default size of the window is 1024 x 768.
  // Smaller devices default to "full screen".
  width = 1024,
  height = 768,
  titleChildren,
  children,
  onResize,
}: DesktopWindowProps) => {
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  // Controls if window is full-screen or not on desktop.
  // Small devices should always be full-screen.
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  const windowPosition = useReactiveVar(WindowPositionReactive) as WindowPosition;

  const shouldBeDraggable = !isTouchDevice() && !isFullScreen;

  useEffect(() => {
    if (onResize) {
      onResize();
    }
  }, [isFullScreen, onResize]);

  const handleStop = () => {
    const el = document.querySelector('.floating');
    if (el && el.getAttribute('style')) {
      const transformValue = el.getAttribute('style') || '';
      windowPosition.updatePosition(transformValue);
    }
  };

  return (
    <ConditionalWrapper
      condition={shouldBeDraggable}
      wrap={children => (
        <Draggable
          onStop={handleStop}
          defaultPosition={windowPosition.position}
          handle=".windowTitleBar"
        >
          {children}
        </Draggable>
      )}
    >
      <WindowWrapper className={isFullScreen ? '' : 'floating'} height={height} width={width}>
        <DesktopWindowTitleBar
          title={title}
          isTouchDevice={isTouchDevice()}
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
          balance={data?.wallet?.paper}
          loadingBalance={loading}
        >
          {titleChildren}
        </DesktopWindowTitleBar>
        {children}
      </WindowWrapper>
    </ConditionalWrapper>
  );
};
export default DesktopWindow;
