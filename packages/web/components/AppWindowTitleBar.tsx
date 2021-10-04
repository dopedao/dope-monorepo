import { css } from '@emotion/react';
import { media } from '../styles/mixins';
import { NavLink } from './NavLink';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';

const AppWindowTitleBar = () => {
  const { account } = useWeb3React();
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
      <NavLink href="/swap-meet">
        <a>Swap Meet</a>
      </NavLink>
      <NavLink href="/loot">
        <a>Loot</a>
      </NavLink>
      <NavLink href="/hustler">
        <a>Hustlers</a>
      </NavLink>
      {account && (
        <NavLink href="/wallet">
          <a>
            {account && account.slice(0, 8)}…
            <Image src="/images/icon/connected.svg" width={16} height={16} alt="Connected" />
          </a>
        </NavLink>
      )}
    </div>
  );
};

export default AppWindowTitleBar;
