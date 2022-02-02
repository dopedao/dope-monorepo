import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 16px;
`;

export default CardContainer;
