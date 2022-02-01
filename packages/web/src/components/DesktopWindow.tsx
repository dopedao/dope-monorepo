import { ReactNode, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';

import { useWalletQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { returnBreakpoint } from 'ui/styles/breakpoints';
import { isTouchDevice } from 'utils/utils';
import ConditionalWrapper from 'components/ConditionalWrapper';
import DesktopWindowTitleBar from 'components/DesktopWindowTitleBar';

type Position = {
  x: number;
  y: number;
};

export type DesktopWindowProps = {
  title: string | undefined;
  width?: number | string;
  height?: number | string;
  background?: string;
  fullScreen?: boolean;
  onlyFullScreen?: boolean;
  fullScreenHandler?: (fullScreen: boolean) => void;
  titleChildren?: ReactNode;
  balance?: string;
  loadingBalance?: boolean;
  children: ReactNode;
  onResize?: () => void;
  onMoved?: (position: any) => void;
};

const WindowWrapper = styled.div<{ width: number | string; height: number | string; background: string }>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: ${({ background }) => (background)};
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
  background,
  fullScreen,
  onlyFullScreen,
  fullScreenHandler,
  titleChildren,
  children,
  onResize,
  onMoved,
}: DesktopWindowProps) => {
  const { account } = useWeb3React();

  const { data, isFetching: loading } = useWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !!account,
    },
  );
  // Controls if window is full-screen or not on desktop.
  // Small devices should always be full-screen.
  const [isFullScreen, setIsFullScreen] = useState(fullScreen || false);
  const toggleFullScreen = () =>
    fullScreenHandler ? fullScreenHandler(!isFullScreen) : setIsFullScreen(!isFullScreen);
  const [windowPosition, setWindowPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const updatePosition = (transformStyle: string) => {
    // pull the current DesktopWindow location from the CSS style on the DOM object
    const transformArr = transformStyle.match(
      /translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/,
    );
    if (transformArr && transformArr.length === 3) {
      setWindowPosition({
        x: parseFloat(transformArr[1]),
        y: parseFloat(transformArr[2]),
      });
    }
  };

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
      updatePosition(transformValue);

      if (onMoved) {
        onMoved(windowPosition);
      }
    }
  };

  return (
    <ConditionalWrapper
      condition={shouldBeDraggable}
      wrap={children => (
        <Draggable onStop={handleStop} defaultPosition={windowPosition} handle=".windowTitleBar">
          {children}
        </Draggable>
      )}
    >
      <WindowWrapper className={isFullScreen ? '' : 'floating'} height={height} width={width} background={ background && background.length > 0 ? background : '#a8a9ae' }>
        {!onlyFullScreen && (
          <DesktopWindowTitleBar
            title={title}
            isTouchDevice={isTouchDevice()}
            isFullScreen={isFullScreen}
            toggleFullScreen={toggleFullScreen}
            balance={data?.wallets?.edges![0]?.node?.paper}
            loadingBalance={loading}
          >
            {titleChildren}
          </DesktopWindowTitleBar>
        )}
        {children}
      </WindowWrapper>
    </ConditionalWrapper>
  );
};
export default DesktopWindow;
