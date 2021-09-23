import Dialog from './Dialog';
import styled from '@emotion/styled';

const ConstructionContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const backgroundCss = `
  #000000 url('/images/desktop/construction-truck.png') center center / contain repeat-y fixed
`;

const ComingSoon = () => {
  return (
    <ConstructionContainer>
      <Dialog backgroundCss={backgroundCss}>We're working on it…</Dialog>
    </ConstructionContainer>
  );
};
export default ComingSoon;
