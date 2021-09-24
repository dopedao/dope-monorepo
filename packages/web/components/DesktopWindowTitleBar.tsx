import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import AppWindowTitleButton from './AppWindowTitleButton';

interface WindowTitleBarProps {
  title: string | undefined;
  children: React.ReactNode;
}

const DesktopWindowTitleBar = ({ title, children }: WindowTitleBarProps) => {
  const router = useRouter();

  const closeWindow = (): void => {
    console.log('Closing window');
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
            grid-template-columns: 1fr 170px 1fr;
            box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
              1px 1px 0px rgba(255, 255, 255, 0.25) inset;
          `}
        >
          <div>
            <AppWindowTitleButton icon="close" clickAction={closeWindow} />
          </div>
          <div
            id="app-title-bar_description"
            css={css`
              font-size: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {title || 'UNTITLED'}
          </div>
          <div></div>
        </div>
        {children}
      </header>
    </div>
  );
};

export default DesktopWindowTitleBar;
