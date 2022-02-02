import Draggable from 'react-draggable';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { useState } from 'react';

type StickyNoteProps = {
  children?: React.ReactNode;
  maxWidth?: string;
  background?: string;
};

const NoteContainer = styled.div<{ maxWidth?: string; background?: string; }>`
  padding: 1em;
  z-index: 2;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  min-width: 128px;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  min-height: 64px;
  position: absolute;
  right: 1em;
  top: 1em;
  background: ${({ background }) => background || '#caffff'};
  text-align: center;
`;
const CloseIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
  cursor:pointer;
  cursor:hand;
`;

const StickyNote = ({ children, maxWidth, background }: StickyNoteProps) => {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible) return (
    <Draggable>
      <NoteContainer maxWidth={maxWidth} background={background}>
        <CloseIconContainer onClick={() => setIsVisible(false)}>
          <Image src="/images/icon/close.svg" alt="close" width="16px" />
        </CloseIconContainer>
        {children}
      </NoteContainer>
    </Draggable>
  );
  return <></>;
}

export default StickyNote;
