import AppWindow from '../../components/AppWindow';
import Head from '../../components/Head';
import StackedResponsiveContainer from '../../components/StackedResponsiveContainer';

const title = 'Initiate New Hustler';

export default function Initiate() {
  return (
    <AppWindow requiresWalletConnection={true}>
      <Head title={title} />
      <StackedResponsiveContainer>
        <div>
          Initiation
          Unbundling
        </div>
        <div>
          Hustler
        </div>
      </StackedResponsiveContainer>
    </AppWindow>
  );
}
