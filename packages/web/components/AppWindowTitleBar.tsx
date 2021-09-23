import { css } from '@emotion/react';
import { media } from '../styles/mixins';
import { NavLink } from './NavLink';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import AppWindowTitleButton from './AppWindowTitleButton';
import Image from 'next/image';

const AppWindowTitleBar = () => {
  const { account } = useWeb3React();
  const router = useRouter();

  const closeWindow = (): void => {
    console.log('Closing window');
    router.replace('/');
  };

  return (
    <div className="appWindowTitleBar">
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
            DOPEWARS
          </div>
          <div></div>
        </div>
        <div
          id="app-title-bar_nav-items"
          css={css`
            background: #d0d0d0;
            border: 2px solid #000;
            border-left: 0px;
            border-right: 0px;
            height: 42px;
            width: 100%;
            font-size: 14px;
            padding: 5px 8px;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            // Flex nav items center for mobile phone
            justify-content: center;
            a:first-child {
              margin-left: 44px;
            }
            // Flex nav items left larger
            ${media.tablet`
              justify-content: flex-start;
              a:first-child {
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
            }
            a.active {
              text-decoration: none;
              background: #000;
              color: #fff;
            }
          `}
        >
          <NavLink href="/loot">
            <a>Loot</a>
          </NavLink>
          <NavLink href="/hustler">
            <a>Hustlers</a>
          </NavLink>
          <NavLink href="/market">
            <a>Market</a>
          </NavLink>
          {account && (
            <NavLink href="/wallet">
              <a>
                <Image src="/images/icon/connected.svg" width={16} height={16} alt="Connected" />
                Connected
              </a>
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
};

export default AppWindowTitleBar;
