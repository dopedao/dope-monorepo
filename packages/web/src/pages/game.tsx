import DesktopWindow from "components/DesktopWindow";
import Head from 'components/Head';
import Boot from "game/scenes/boot";
import GameScene from "game/scenes/game";
import Preload from "game/scenes/preload";
import dynamic from "next/dynamic";

// disable ssr for our gamebody. webgl
const GameNoSSR = dynamic(() => import('../components/GameBody'), {ssr: false});

export default function Game()
{
  return (
      <>
        <Head title="Game" />
        <GameNoSSR />
      </>
  );
}