import Draggable from 'react-draggable';
import { isTouchDevice } from 'utils/utils';
import ConditionalWrapper from 'components/ConditionalWrapper';

import styled from '@emotion/styled';
import { Button, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { media } from 'ui/styles/mixins';
import { css } from '@emotion/react';

type StickyNoteProps = {
  children?: React.ReactNode;
  maxWidth?: string;
  background?: string;
  canClose?: boolean;
};

const NoteContainer = styled.div<{ maxWidth?: string; background?: string }>`
  padding: 1em;
  z-index: 2;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  min-width: 128px;
  min-height: 64px;
  position: absolute;
  bottom: 25%;
  left: 0%;
  background: ${({ background }) => background || '#fcf4a7'};
  text-align: center;
  cursor: pointer;
  cursor: hand;
  margin: 3em;
  ${media.tablet`
    max-width: 375px;
    left: unset;
    right: 0;
  `}
`;
const CloseIconContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  cursor: hand;
`;

const shouldBeDraggable = !isTouchDevice();

const StickyNote = ({ children, maxWidth, background, canClose = false }: StickyNoteProps) => {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible)
    return (
      <ConditionalWrapper
        condition={shouldBeDraggable}
        wrap={children => <Draggable>{children}</Draggable>}
      >
        <NoteContainer maxWidth={maxWidth} background={background}>
          {children}
          {canClose && (
            <Button
              onClick={() => setIsVisible(false)}
              css={css`
                margin-top: 8px;
              `}
              width="100%"
            >
              Close
            </Button>
          )}
        </NoteContainer>
      </ConditionalWrapper>
    );
  return <></>;
};

export default StickyNote;
