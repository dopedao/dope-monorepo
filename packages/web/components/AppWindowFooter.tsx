import { css } from '@emotion/react';

export interface Props {
  children: React.ReactNode;
}

const AppWindowFooter = ({ children }: Props) => {
  return (
    <footer
      css={css`
        height: var(--footer-height);
        border-top: var(--border-black);
        a {
          text-decoration: none;
        }
      `}
    >
      {children}
    </footer>
  );
};

export default AppWindowFooter;
