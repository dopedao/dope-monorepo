import { ReactNode } from "react";
import { css } from "@emotion/react";

type DialogProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

const Dialog = ({
  title,
  className,
  children,
}: DialogProps) => {
  return (
    <div css={css`
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);

      ${className}
    `}>
      <div css={css`
        background: #DEDEDD;
        box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
        padding: 30px 25px;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        border: 2px solid;
        z-index: 10;
      `}>
        {!!title && <div>{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
