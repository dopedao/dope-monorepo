import styled from '@emotion/styled';

const DopeCardItems = styled.div<{ isExpanded: boolean }>`
  background-color: var(--gray-800);
  padding: 16px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: ${({ isExpanded }) => (isExpanded ? 'auto' : '60px')};
`;

export default DopeCardItems;
