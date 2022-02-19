import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  `}
  grid-column-gap: 10px;
  grid-row-gap: 16px;
`;

export default CardContainer;
