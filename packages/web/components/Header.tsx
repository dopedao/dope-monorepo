import { useState } from 'react';
import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';

import { NavLink } from './NavLink';
import DisconnectWallet from './DisconnectWallet';

export const Header = () => {
  const { account } = useWeb3React();
  const [displayDisconnect, setDisplayDisconnect] = useState(false);
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
          css={css`
            color: #fff;
            height: 32px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 170px 1fr;
          `}
        >
          <div />
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              background: #000;
              font-size: 14px;
            `}
          >
            Dope Wars
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 12px;
              padding: 0 15px;
            `}
          >
            {account && (
              <button
                css={css`
                  background: none;
                  border: none;
                `}
                onClick={() => setDisplayDisconnect(true)}
              >
                {account.slice(0, 4)}...{account.slice(-4)}
              </button>
            )}
          </div>
        </div>
        <div
          css={css`
            background: #d0d0d0;
            border: 2px solid #000;
            height: 42px;
            width: 100%;
            display: flex;
            font-size: 14px;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 5px 32px;

            a {
              height: 30px;
              padding: 0 12px;
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
          <NavLink href="/your-loot">
            <a>Your Loot</a>
          </NavLink>
          <NavLink href="/hustler">
            <a>Hustler</a>
          </NavLink>
          <NavLink href="/market">
            <a>Market</a>
          </NavLink>
        </div>
        {displayDisconnect && <DisconnectWallet onClose={() => setDisplayDisconnect(false)} />}
      </header>
    </>
  );
};
