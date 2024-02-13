import LoadingBlock from 'components/LoadingBlock';
import Container from 'features/swap-meet/components/Container';

const LoadingState = () => (
  <Container>
    <LoadingBlock maxRows={5} />
  </Container>
);

export default LoadingState;
