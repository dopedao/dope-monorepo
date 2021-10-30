import { useRouter } from 'next/router';
import AppWindow from '../../components/AppWindow';
import Head from '../../components/Head';
import RenderFromLootId from '../../components/hustler/RenderFromLootId';

const HustlerFromLoot = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppWindow padBody={false}>
      <Head title="Hustler Preview" />
      <RenderFromLootId id={id} />
    </AppWindow>
  );
};

export default HustlerFromLoot;
