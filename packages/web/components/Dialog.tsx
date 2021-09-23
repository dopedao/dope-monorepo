import { css } from '@emotion/react';
import { media } from '../styles/mixins';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

export interface DialogProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  backgroundCss?: string;
  children: ReactNode;
}

const defaultBackgroundCss = "rgba(0,0,0,0.5) url('/images/tile/brick-black.png') center/25% fixed";

const Dialog = ({
  title,
  className,
  onClose,
  backgroundCss = defaultBackgroundCss,
  children,
}: DialogProps) => {
  const content = useRef<HTMLDivElement>(null);

  const DialogContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${backgroundCss};
    ${className}
  `;

  useEffect(() => {
    if (!onClose) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    addEventListener('keydown', closeOnEscape);
    return () => removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const onClick = useCallback(
    e => {
      if (!onClose || !content.current || content.current.contains(e.target)) return;

      onClose();
    },
    [content, onClose],
  );

  return (
    <DialogContainer onClick={onClick}>
      <div
        ref={content}
        css={css`
        background: #DEDEDD;
        box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px;
        rgba(255, 255, 255, 0.25);
        padding: 16px;
        border: 2px solid;
        width: 90vw;
        h3 {
          font-size: var(--text-02);
          line-height: 1.25em;
          padding: 0;
          margin-bottom: 16px;
        }
        font-size: 1em;
        ${media.tablet`
          padding: 32px;
          text-align: left;
          width: 400px;
        `}
      `}
      >
        {!!title && <h3>{title}</h3>}
        {children}
      </div>
    </DialogContainer>
  );
};

export default Dialog;
