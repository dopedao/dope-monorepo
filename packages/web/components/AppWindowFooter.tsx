import { css } from '@emotion/react';

export default () => {
  return (
    <footer
      css={css`
        height: var(--footer-height);
        border-top: var(--border-black);
        a {
          text-decoration: none;
        }
      `}
    ></footer>
  );
}
