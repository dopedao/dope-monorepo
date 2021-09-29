import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import DesktopWindowTitleButton from './DesktopWindowTitleButton';

interface WindowTitleBarProps {
  title: string | undefined;
  isTouchDevice: boolean;
  isFullScreen: boolean;
  toggleFullScreen(): void;
  children: React.ReactNode;
}

const DesktopWindowTitleBar = ({
  title,
  isTouchDevice,
  isFullScreen,
  toggleFullScreen,
  children,
}: WindowTitleBarProps) => {
  const router = useRouter();

  const closeWindow = (): void => {
    router.replace('/');
  };

  return (
    <div className="windowTitleBar">
      <header
        css={css`
          background: #141011;
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: var(--header-z);
          display: flex;
          flex-direction: column;
          cursor: move;
        `}
      >
        <div
          id="app-title-bar"
          css={css`
            color: #fff;
            height: 32px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
              1px 1px 0px rgba(255, 255, 255, 0.25) inset;
          `}
          onDoubleClick={() => toggleFullScreen()}
        >
          <div>
            <DesktopWindowTitleButton icon="close" title="Close Window" clickAction={closeWindow} />
          </div>
          <div
            id="app-title-bar_description"
            css={css`
              justify-self: center;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {title || 'UNTITLED'}
          </div>
          <div
            css={css`
              justify-self: end;
            `}
          >
            {!isTouchDevice && (
              <DesktopWindowTitleButton
                icon={isFullScreen ? 'window-restore' : 'window-maximize'}
                title={isFullScreen ? 'Minimize' : 'Maximize'}
                clickAction={toggleFullScreen}
              />
            )}
          </div>
        </div>
        {children}
      </header>
    </div>
  );
};

export default DesktopWindowTitleBar;
