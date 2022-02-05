import Head from 'components/Head';
import dynamic from 'next/dynamic';

// disable ssr for our gamebody. webgl
const GameNoSSR = dynamic(() => import('../components/GameBody'), { ssr: false });

export default function Game() {
  return (
    <>
      <Head title="Game" />
      <GameNoSSR />
    </>
  );
}
