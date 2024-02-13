import { useRouter } from 'next/router';
import HustlerSpriteSheetWalk from 'features/hustlers/components/HustlerSpriteSheetWalk';
import DesktopWindow from 'components/DesktopWindow';
import { Box } from '@chakra-ui/react';

const HustlerWalk = () => {
  const router = useRouter();
  const { id: hustlerId } = router.query;
  return (
    <DesktopWindow title="Plug Walk" hideWalletAddress>
      <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
        <HustlerSpriteSheetWalk id={hustlerId?.toString()} />
      </Box>
    </DesktopWindow>
  );
};
export default HustlerWalk;
