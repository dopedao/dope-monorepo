import { css } from '@emotion/react';
import { media } from 'styles/mixins';
import { ReactNode } from 'react';

const AppWindowNavBar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      id="app-title-bar_nav-items"
      css={css`
        background: #d0d0d0;
        border: 2px solid #000;
        border-left: 0px;
        border-right: 0px;
        height: 42px;
        width: 100%;
        padding: 5px 8px;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        // Flex nav items left larger
        ${media.tablet`
          a:first-of-type {
            margin-left: 0px;
          }
        `}
        a {
          height: 30px;
          padding: 0 12px;
          margin-right: 12px;
          gap: 4px;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        a.active {
          text-decoration: none;
          background: #000;
          color: #fff;
        }
      `}
    >
      { children }
    </div>
  );
};

export default AppWindowNavBar;
