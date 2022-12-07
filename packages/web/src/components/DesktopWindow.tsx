/**
 * DesktopWindow is the base for most of our containers within the app.
 * It contains complex logic to display itself intelligently on
 * phones, tablets, and laptops.
 *
 * When not a touch device, we allow dragging of windows.
 * On a touch device, we try to display as a full-screen content window,
 * which generally feels like a higher quality experience there.
 *
 * 🙃
 */
import { ReactNode, useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { returnBreakpoint } from 'ui/styles/breakpoints';
import { isTouchDevice } from 'utils/utils';
import ConditionalWrapper from 'components/ConditionalWrapper';
import DesktopWindowTitleBar from 'components/DesktopWindowTitleBar';
import useBrowserWidth from 'hooks/use-browser-width';
import { useFullScreen } from 'hooks/FullScreenProvider';

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
  scrollable?: boolean;
  fullScreenHandler?: (fullScreen: boolean) => void;
  titleChildren?: ReactNode;
  balance?: string;
  loadingBalance?: boolean;
  children: ReactNode;
  onResize?: () => void;
  onClose?: () => void;
  onMoved?: (position: any) => void;
  posX?: number;
  posY?: number;
  hideWalletAddress?: boolean;
};

const WindowWrapper = styled.div<{
  scrollable?: boolean;
  width: number | string;
  height: number | string;
  background: string;
}>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: ${({ background }) => background};
  border: 2px solid #000;
  box-shadow: 8px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow-y: ${({ scrollable }) => (scrollable ? 'scroll' : 'hidden')};
  overflow-x: hidden;
  position: absolute;
  &.floating {
    position: absolute;
    ${media.phone`
      width: 100%;
      height: 100%;
      margin: 0;
      top: 0;
      left: 0;
      right: 0;
    `}
    @media (min-width: ${returnBreakpoint('tablet')}) {
      max-width: ${({ width }) => (typeof width == 'number' ? `${width}px` : width)};
      max-height: ${({ height }) => (typeof height == 'number' ? `${height}px` : height)};
      margin: 0;
      top: 32px;
      right: 96px;
      left: unset;
      max-width: ${({ width }) => (typeof width == 'number' ? `${width}px` : width)};
      max-height: ${({ height }) => (typeof height == 'number' ? `${height}px` : height)};
    }
    @media (min-width: ${returnBreakpoint('laptop')}) {
      top: 32px;
      left: 96px;
      width: 80%;
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
  height = '90%',
  background,
  fullScreen,
  onlyFullScreen,
  fullScreenHandler,
  titleChildren,
  children,
  onResize,
  onMoved,
  onClose,
  scrollable,
  posX = 0,
  posY = 0,
  hideWalletAddress = false,
}: DesktopWindowProps) => {
  const { account } = useWeb3React();
  const windowRef = useRef<HTMLDivElement>(null);
  const browserWidth = useBrowserWidth();
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
  // const [isFullScreen, setIsFullScreen] = useState(fullScreen || false);
  const fullScreenHook = useFullScreen();

  const toggleFullScreen = () =>{
    fullScreenHandler ? fullScreenHandler(!fullScreenHook?.isFullScreen) : fullScreenHook?.setIsFullScreen(!fullScreenHook?.isFullScreen);
  }
  const [windowPosition, setWindowPosition] = useState<Position>({
    x: posX || 0,
    y: posY || 0,
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

  const shouldBeDraggable = !isTouchDevice() && !fullScreenHook?.isFullScreen && browserWidth > 768;

  useEffect(() => {
    if (fullScreen)
      fullScreenHook?.setIsFullScreen(fullScreen);
  }, [fullScreen, fullScreenHook])

  useEffect(() => {
    if (onResize) onResize();
  }, [fullScreenHook?.isFullScreen, onResize]);

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

  // Set zIndex to ensure we can have more than one DesktopWindow open at a time
  const focusWindow = () => {
    const windows = document.getElementsByClassName(
      'desktopWindow',
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < windows.length; i++) {
      windows[i].style.zIndex = '0';
    }
    if (windowRef?.current) windowRef.current.style.zIndex = '50';
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
      <WindowWrapper
        ref={windowRef}
        className={`desktopWindow ${fullScreenHook?.isFullScreen ? '' : 'floating'}`}
        height={height}
        width={width}
        background={background && background.length > 0 ? background : '#a8a9ae'}
        scrollable={scrollable}
        onClick={focusWindow}
      >
        {!onlyFullScreen && (
          <DesktopWindowTitleBar
            title={title}
            isTouchDevice={isTouchDevice()}
            isFullScreen={fullScreenHook?.isFullScreen || false}
            toggleFullScreen={toggleFullScreen}
            balance={data?.wallets?.edges![0]?.node?.paper}
            loadingBalance={loading}
            windowRef={windowRef?.current}
            hideWalletAddress={hideWalletAddress}
            onClose={onClose}
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
