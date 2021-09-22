import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface DialogProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  children: ReactNode;
}

const Dialog = ({ title, className, onClose, children }: DialogProps) => {
  const content = useRef<HTMLDivElement>(null);

  const DialogContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    background-image: url('/images/tile/brick-black.png');
    background-size: 200px 200px;
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
        padding: 32px;
        border: 2px solid;
        width: 400px;
      `}
      >
        {!!title && <div>{title}</div>}
        {children}
      </div>
    </DialogContainer>
  );
};

export default Dialog;
