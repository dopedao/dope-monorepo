import AppWindow from '../components/AppWindow';
import Head from '../components/Head';

const title = 'Dope Wars Market';

export default function Market() {
  return (
    <AppWindow padBody={false}>
      <Head title={title} />
    </AppWindow>
  );
}
