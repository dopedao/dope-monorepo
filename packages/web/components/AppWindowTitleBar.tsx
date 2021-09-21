import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { NavLink } from './NavLink';
import { useRouter } from 'next/router';
import AppWindowTitleButton from './AppWindowTitleButton';

const AppWindowTitleBar = () => {
  const { account } = useWeb3React();
  const router = useRouter();

  const closeWindow = (): void => {
    router.replace('/');
  };

  return (
    <>
      <header
        css={css`
          background: #585858;
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: var(--header-z);
          display: flex;
          flex-direction: column;
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
              display: flex;
              align-items: center;
              justify-content: center;
              background: #000;
              font-size: 14px;
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
            display: flex;
            font-size: 14px;
            flex-direction: row;
            align-items: center;
            padding: 5px 8px;
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
            <a>Your Loot</a>
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
                <img src="/images/icon/connected.svg" width="16" height="16" alt="Connected" />
                Connected
              </a>
            </NavLink>
          )}
        </div>
      </header>
    </>
  );
};

export default AppWindowTitleBar;
