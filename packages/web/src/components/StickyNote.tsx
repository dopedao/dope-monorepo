import Draggable from 'react-draggable';
import { isTouchDevice } from 'utils/utils';
import ConditionalWrapper from 'components/ConditionalWrapper';

import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { useState } from 'react';
import { media } from 'ui/styles/mixins';

type StickyNoteProps = {
  children?: React.ReactNode;
  maxWidth?: string;
  background?: string;
  canClose?: boolean;
};

const NoteContainer = styled.div<{ maxWidth?: string; background?: string; }>`
  padding: 1em;
  z-index: 2;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  min-width: 128px;
  min-height: 64px;
  position: absolute;
  left: 0em;
  top: 0em;
  background: ${({ background }) => background || '#caffff'};
  text-align: center;
  ${media.tablet`
    max-width: 375px;
    left: unset;
    top: 2em;
    right: 2em;
  `}
`;
const CloseIconContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
  cursor:pointer;
  cursor:hand;
`;

const shouldBeDraggable = !isTouchDevice();

const StickyNote = ({ children, maxWidth, background, canClose = false }: StickyNoteProps) => {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible) return (
      <ConditionalWrapper
        condition={shouldBeDraggable}
        wrap={children => (
          <Draggable>
            {children}
          </Draggable>
        )}
      >
        <NoteContainer maxWidth={maxWidth} background={background}>
          { canClose && 
            <CloseIconContainer onClick={() => setIsVisible(false)}>
              <Image src="/images/icon/close.svg" alt="close" width="12px" />
            </CloseIconContainer>
          }
          {children}
        </NoteContainer>
    </ConditionalWrapper>
  );
  return <></>;
}

export default StickyNote;
