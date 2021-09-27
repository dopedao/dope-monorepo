import { media } from '../styles/mixins';
import { returnBreakpoint } from '../styles/breakpoints';
import { useState } from 'react';
import ConditionalWrapper from './ConditionalWrapper';
import DesktopWindowTitleBar from './DesktopWindowTitleBar';
import Draggable from 'react-draggable';
import React from 'react';
import styled from '@emotion/styled';

interface DesktopWindowProps {
  title: string | undefined;
  width?: number;
  height?: number;
  titleChildren?: React.ReactNode;
  children: React.ReactNode;
}

const DesktopWindow = ({
  title,
  // Default size of the window is 1024 x 768.
  // Smaller devices default to "full screen".
  width = 1024,
  height = 768,
  titleChildren,
  children,
}: DesktopWindowProps) => {

  // Controls if window is full-screen or not on desktop.
  // Small devices should always be full-screen.
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const WindowWrapper = styled.div`
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
        max-width: ${width}px;
        max-height: ${height}px;
      }
    }
  `;

  const isTouchDevice = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  };

  return (
    <ConditionalWrapper
      condition={!isTouchDevice()}
      wrap={children => <Draggable handle=".windowTitleBar">{children}</Draggable>}
    >
      <WindowWrapper className={isFullScreen ? '' : 'floating'}>
        <DesktopWindowTitleBar 
          title={title} 
          toggleFullScreen={toggleFullScreen}
        >
          {titleChildren}
        </DesktopWindowTitleBar>
        {children}
      </WindowWrapper>
    </ConditionalWrapper>
  );
};
export default DesktopWindow;
