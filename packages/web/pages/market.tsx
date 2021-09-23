import AppWindow from '../components/AppWindow';
import ComingSoon from '../components/ComingSoon';
import Head from '../components/Head';

export default function Market() {
  return (
    <AppWindow padBody={false}>
      <Head title="Dope Wars Market" />
      <ComingSoon />
    </AppWindow>
  );
}
