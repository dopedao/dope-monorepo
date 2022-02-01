import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import { ReactNode } from 'react';

const AppWindowNavBar = ({ children, showBorder = false }: { children: ReactNode, showBorder?: boolean }) => {
  return (
    <div
      id="app-title-bar_nav-items"
      css={css`
        background: #202221;
        border: 0;
        border-bottom: ${showBorder ? '4px' : '0' } solid white; 
        height: 40px;
        width: 100%;
        overflow-y: hidden;
        display: flex;
        align-items: flex-end;
        a {
          position: relative;
          height: 30px;
          width: 20%;
          background-color: #434345;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 25px;
        }
        a.active {
          text-decoration: none;
          background: #fff;
          color: #000;
        }
        a::before {
          content: " ";
          position: absolute;
          width: 10px;
          top: 0; left: 0; bottom: 0; 
          background-color: #434345;
          border-radius: 3px 3px 0 0;
          transform: translateX(-5px) scale(1.26) perspective(1px) rotateX(.5deg);
          transform-origin: bottom;
        }
        a.active::before {
          background-color: #fff;
        }
        a::after {
          content: " ";
          position: absolute;
          width: 10px;
          top: 0; right: 0; bottom: 0; 
          background-color: #434345;
          border-radius: 3px 3px 0 0;
          transform: translateX(5px) scale(1.26) perspective(1px) rotateX(.5deg);
          transform-origin: bottom;
        }
        a.active::after {
          background-color: #fff;
        }
      `}
    >
      {children}
    </div>
  );
};

export default AppWindowNavBar;
