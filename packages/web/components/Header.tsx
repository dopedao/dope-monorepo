import { css } from "@emotion/react";
import { NavLink } from "./NavLink";

export const Header = () => {
  return (
    <>
      <header
        css={css`
          background: #585858;
          height: 68px;
          position: sticky;
          top: 0;
          z-index: var(--header-z);
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            background: #d0d0d0;
            color: #fff;
            height: 32px;
            border: 2px solid #1c1c1c;
            display: flex;
          `}
        >
          <div
            css={css`
              background: #000;
              display: flex;
              height: 100%;
              width: 171px;
              align-items: center;
              justify-content: center;
            `}
          >
            Dope Wars
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
          <NavLink passHref href="/">
            <a>Marketplace</a>
          </NavLink>
          <NavLink passHref href="/list">
            <a>Your Loot</a>
          </NavLink>
        </div>
      </header>
    </>
  );
};
