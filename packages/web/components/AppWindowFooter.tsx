import { css } from '@emotion/react';

const AppWindowFooter = () => {
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
};

export default AppWindowFooter;
