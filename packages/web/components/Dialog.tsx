import { ReactNode, useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";

interface DialogProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  children: ReactNode;
};

const Dialog = ({
  title,
  className,
  onClose,
  children,
}: DialogProps) => {
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onClose) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }

    addEventListener("keydown", closeOnEscape);

    return () => removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const onClick = useCallback((e) => {
    if (!onClose || !content.current || content.current.contains(e.target)) return;

    onClose();
  }, [content, onClose]);

  return (
    <div css={css`
      position: relative;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      padding: 5em;
      ${className}
    `} onClick={onClick}>
      <div ref={content} css={css`
        background: #DEDEDD;
        box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
        padding: 32px;
        position: relative;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        border: 2px solid;
        z-index: 10;
        width: 400px;
      `}>
        {!!title && <div>{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
