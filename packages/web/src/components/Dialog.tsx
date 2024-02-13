/* eslint-disable @next/next/no-img-element */
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import { Box } from '@chakra-ui/react';

export interface DialogProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  backgroundCss?: string;
  icon?: string;
  children: ReactNode;
}

const defaultBackgroundCss = "rgba(0,0,0,0.5) url('/images/tile/brick-black.png') center/25% fixed";

const Dialog = ({
  title,
  className,
  onClose,
  backgroundCss = defaultBackgroundCss,
  icon,
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
    img {
      width: 75%;
    }
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
      <Box
        ref={content}
        css={css`
          background: #dededd;
          box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25),
            inset 1px 1px 0px rgba(255, 255, 255, 0.25);
          padding: 16px;
          border: 2px solid;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin: 16px;
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
            max-width: 30em;
        `}
        `}
      >
        {icon && (
          <img
            alt={title}
            src={`/images/icon/${icon}.svg`}
            css={css`
              max-width: 44px;
            `}
          />
        )}
        <Box>
          {!!title && <h3>{title}</h3>}
          {children}
        </Box>
      </Box>
    </DialogContainer>
  );
};

export default Dialog;
