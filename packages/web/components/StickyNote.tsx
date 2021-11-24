import { media } from 'styles/mixins';
import Draggable from 'react-draggable';
import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
  maxWidth?: string;
}

const StickyNote = ({ children, maxWidth }: Props) => {
  const NoteContainer = styled.div`
    padding: 1em;
    z-index: 2;
    filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
    min-width: 128px;
    max-width: ${maxWidth};
    min-height: 64px;
    position: absolute;
    right: 1em;
    top: 1em;
    background-color: #caffff;
    text-align: center;
  `;
  return (
    <Draggable>
      <NoteContainer>{children}</NoteContainer>
    </Draggable>
  );
};
export default StickyNote;
