import Draggable from 'react-draggable';
import styled from '@emotion/styled';

type StickyNoteProps = {
  children?: React.ReactNode;
  maxWidth?: string;
};

const NoteContainer = styled.div<{ maxWidth?: string }>`
  padding: 1em;
  z-index: 2;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  min-width: 128px;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  min-height: 64px;
  position: absolute;
  right: 1em;
  top: 1em;
  background-color: #caffff;
  text-align: center;
`;

const StickyNote = ({ children, maxWidth }: StickyNoteProps) => (
  <Draggable>
    <NoteContainer maxWidth={maxWidth}>{children}</NoteContainer>
  </Draggable>
);

export default StickyNote;
